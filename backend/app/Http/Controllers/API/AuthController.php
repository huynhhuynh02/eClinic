<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Utils\AppConstants;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|max:20',
            'clinic_id' => 'required|integer|min:1|max:20'
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'clinic_id' => $request->clinic_id
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user, 'access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }

        if(!Auth::attempt($request->only('email', 'password')))
        {
            return response()->json(['message' => AppConstants::MESSAGE_LOGIN_NOT_CORRECT, 'status' => false]);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => $user, 'access_token' => $token, 'token_type' => 'Bearer', 'status' => true]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'logout completed!']);
    }

    public function profile()
    {
        return response()->json(['profile' => Auth::user()]);
    }
}

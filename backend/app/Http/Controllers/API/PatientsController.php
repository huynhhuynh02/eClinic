<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use Symfony\Component\VarDumper\Cloner\Data;

class PatientsController extends Controller
{
    function index()
    {
        $data['patients'] = Patient::all();
        return response()->json($data);
    }

    // create patient
    function create(Request $request)
    {
        request()->validate([
            'name' => 'required',
        ]);
        $request['fullname'] = $request->name;
        // unset($request['name']);
        dd($request->all());
        // Patient::create($request->all());
        // $mess = "success";
        // return response()->json($mess);
    }
}

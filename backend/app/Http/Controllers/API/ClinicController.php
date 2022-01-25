<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Models\User;
use App\Models\Clinic;

class ClinicController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function __construct()
    // {
        // $this->middleware('permission:clinic-list|clinic-create|clinic-edit|clinic-delete', ['only' => ['index', 'show']]);
        // $this->middleware('permission:clinic-create', ['only' => ['create', 'store']]);
        // $this->middlewara('permission:clinic-edit', ['only' => ['edit', 'update']]);
        // $this->middlewara('permission:clinic-delete', ['only' => ['destroy']]);
    // }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		// $canView = true;
		// $user = auth()->user()->toArray();
        $clinics = Clinic::all();
        // return new Clinic(Schedule::all());
    }
	
	/**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = auth()->user();
		$user = $user->toArray();
        $clinic = Clinic::find($user['clinic_id']);
		// var_dump( $user);
		// var_dump( $clinic);
		return response()->json(['clinic' => $clinic]);
    }
	
    public function update(Request $request)
    {
		var_dump( $_POST);
		var_dump( $_FILES);
        $user = auth()->user();
		$user = $user->toArray();
        $clinic = Clinic::find($user['clinic_id']);
		try {
            //code...
            $input = $request->all();
            $clinic = Clinic::find($user['clinic_id']);
			if( !$clinic){
				$clinic = Clinic::create($input);
			}else{
				$clinic->update($input);
			}
            // $clinic->save();
			$clinic = Clinic::find($user['clinic_id']);
			return response()->json(['clinic' => $clinic]);


        } catch (\Exception $e) {
            throw $e;
			exit;
        }
    }
	
	
	
}

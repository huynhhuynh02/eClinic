<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Clinic;
use App\Models\User;

class ClinicsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('permission:clinic-list|clinic-create|clinic-edit|clinic-delete', ['only' => ['index', 'show']]);
        $this->middleware('permission:clinic-create', ['only' => ['create', 'store']]);
        $this->middlewara('permission:clinic-edit', ['only' => ['edit', 'update']]);
        $this->middlewara('permission:clinic-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clinics = Clinic::all();
        return response()->json(['clinics' => $clinics]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function info(Request $request)
    {
        $clinic = Doctor::first();
        return response()->json(['clinic' => $clinic]);
    }

}

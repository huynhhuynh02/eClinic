<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use App\Models\PrescriptionDetail;
use App\Http\Resources\PrescriptionCollection;
use App\Http\Resources\PrescriptionResource;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $user_id = auth()->id();

        return new PrescriptionCollection(Prescription::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        try {
            $prescription = new Prescription;
            $prescription->user_id = auth()->id();
            $prescription->patient_id = $request->patient_id;
            $prescription->diagnose = $request->diagnose;
            $prescription->reason = $request->reason;
            $prescription->height = $request->height;
            $prescription->pressure = $request->pressure;
            $prescription->pulse = $request->pulse;
            $prescription->weight = $request->weight;
            $prescription->remark = $request->remark;
            $prescription->save();
            //return response()->json($request->medicines, 201);

            foreach($request->medicines as $medicine) {
                $prescription_detail = new PrescriptionDetail;
                $prescription_detail->prescription_id = $prescription->id;
                $prescription_detail->medicine_id = $medicine['medicine_id'];
                $prescription_detail->amount = $medicine['quantity'];
                $prescription_detail->use = $medicine['use'];
                $prescription_detail->unit = $medicine['unit'];
                $prescription_detail->save();
            }
            
            return response()->json([
                'status' => 'success',
                'message' => 'Created success !'
            ], 201);

        } catch (\Exception $e) {
            throw $e;
            return response()->json([
                'error' => $e
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return new PrescriptionResource(Prescription::find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Patient;
use App\Models\Doctor;
use Validator;
use Carbon\Carbon;

class SchedulesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($key = $request->key)
        {
            $data['schedules'] = Schedule::with('patient', 'doctor')->whereRelation('patient', 'fullname', 'like', '%'.$key.'%')->orWhereRelation('patient', 'phone', 'like', $key.'%')->get();
        } else {
            $data['schedules'] = Schedule::with('patient', 'doctor')->get();
        }

        $data['doctors'] = Doctor::all();
        
        return response()->json($data);
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
        if ($request->action === 'CREATE_SCHEDULE_ONLY') {
            $validator = Validator::make($request->all(), [
                'patient_id' => 'required',
                'doctor_id' => 'required',
                'schedule_time' => 'required'
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                'patient_name' => 'required',
                'patient_group_id' => 'required',
                'address' => 'required',
                'phone' => 'required',
                'sex' => 'required',
                'birthday' => 'required',
                'doctor_id' => 'required',
                'schedule_time' => 'required'
            ]);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if ($request->action === 'CREATE_SCHEDULE_ONLY')
        {
            $patient_id = $request->patient_id;
        } else {
            $patient = new Patient();
            $patient->fullname = $request->patient_name;
            $patient->patient_group_id = $request->patient_group_id;
            $patient->address = $request->address;
            $patient->phone = $request->phone;
            $patient->sex = $request->sex;
            $patient->birthday = date("Y-m-d", strtotime($request->birthday));
            $patient->save();
            $patient_id = $patient->id;
        }

        $schedule = new Schedule();
        $schedule->patient_id = $patient_id;
        $schedule->doctor_id = $request->doctor_id;
        $schedule->schedule_time = date("Y-m-d H:m:s", strtotime($request->schedule_time));
        $schedule->save();
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
        if (!$schedule = Schedule::find($id))
        {

        }
        return response()->json($schedule);
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
        if ($request->action === 'UPDATE_DOCTOR_ONLY')
        {
            $validator = Validator::make($request->all(), [
                'doctor_id' => 'required',
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                'schedule_time' => 'required',
            ]);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $schedule = Schedule::find($id);
        if ($request->action === 'UPDATE_DOCTOR_ONLY')
        {
            $schedule->doctor_id = $request->doctor_id;
        } else {
            $new_schedule_time = implode(' ', array_slice(explode(' ' ,$request->schedule_time), 1, 4));
            $schedule->schedule_time = date("Y-m-d H:m:s", strtotime($new_schedule_time));
        }
        $schedule->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$schedule = Schedule::find($id))
        {

        }
        Schedule::where('id', $id)->delete();
    }
}

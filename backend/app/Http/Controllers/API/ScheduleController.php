<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Patient;
use App\Http\Resources\ScheduleCollection;
use App\Http\Resources\ScheduleResource;
use App\Http\Requests\StoreScheduleRequest;
use DateTime;
use Illuminate\Support\Facades\Validator;
class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $perPager = $request["per_page"];
        $pagination =  new ScheduleCollection(Schedule::paginate($perPager)->appends(request()->query()));
        return $pagination;
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
    public function store(StoreScheduleRequest $request)
    {
        //

        $patient = Patient::where('phone', $request->phone)->first();

        if($patient) {
            $schedule = new Schedule;
            $schedule->patient_id = $patient->id;
            $schedule->description = $request->remark;
            $schedule->schedule_time = new DateTime();
            $schedule->status = 1;
            $schedule->type = 1;
            $schedule->save();

        } else {
            $patient = new Patient;
            $patient->fullname = $request->fullname;
            $patient->phone = $request->phone;
            $patient->address = $request->address;
            $patient->sex = $request->sex;
            $patient->birthday = $request->birthday;
            $patient->remark = $request->remark;
            $patient->user_id = auth()->user()->id;
            $patient->save();

            if($patient) {
                $schedule = new Schedule;
                $schedule->patient_id = $patient->id;
                $schedule->description = $request->remark;
                $schedule->schedule_time = new DateTime();
                $schedule->status = 1;
                $schedule->type = 1;
                $schedule->save();
            }
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
        $schedule =Schedule::find($id);

        if(!$schedule) {
            return response()->json([
                'message' => 'id '.$id.' not found',
                'status'=> 'error'
            ],404);
        }
        
        return new ScheduleResource($schedule);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        try {
            $schedule = Schedule::find($id);
            if(!$schedule) {
                return response()->json([
                    'message' =>'id '.$id.' not found',
                    'status'=> 'error'
                ],404);
            }
            $schedule->schedule_time = $request->schedule_time;
            $schedule->description = $request->description;

            $schedule->save();

            return new ScheduleResource($schedule);
        } catch (\Exception $e) {
            throw $e;
        }
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
        $schedule = Schedule::find($id);
        if(!$schedule) {
            return response()->json([
                'message' =>'id '.$id.' not found',
                'status'=> 'error'
            ],404);
        }

        $schedule->delete();
        return response()->json([
            'message' => 'delete success id '. $schedule->id,
            'status'=> 'success'
        ],201);
    }
}

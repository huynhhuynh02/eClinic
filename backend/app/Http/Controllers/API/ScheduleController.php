<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Patient;
use App\Http\Resources\ScheduleCollection;
use App\Http\Resources\ScheduleResource;
use App\Http\Requests\StoreScheduleRequest;
use App\Models\DealineConfig;
use DateTime;
use Illuminate\Support\Facades\Date;
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
        $today = date_format(new DateTime('now'), 'Y-m-d');
        $pagination =  new ScheduleCollection(Schedule::whereDate('schedule_time', '=', $today)->where('status', 0)->orderBy('schedule_time')->paginate($perPager)->appends(request()->query()));
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
        $today = date_format(new DateTime('now'), 'Y-m-d');
        $dealine_config = DealineConfig::where(['date' => $today, 'is_default' => false])->first();

        if($dealine_config) {
            $open_time = $dealine_config->open_time;
        } else {
            $dealine_default = DealineConfig::where('is_default', true)->first();
            $open_time = $dealine_default->open_time;
        }
        
        $schedule_today = Schedule::whereDate('schedule_time', '=', $today)->first();
        if($schedule_today) {
            $last_schedule = Schedule::orderBy('schedule_time', 'desc')->first();
            $schedule_time = $last_schedule->schedule_time;
            $start_time = date('Y-m-d H:i:s', strtotime('+30 minutes', strtotime($schedule_time)));
        } else {
            $start_time = new DateTime($today.$open_time);
        }

        if($patient) {
            $schedule = new Schedule;
            $schedule->patient_id = $patient->id;
            $schedule->description = $request->remark;
            $schedule->schedule_time = $start_time;
            $schedule->status = 0;
            $schedule->type = 1;
            $schedule->save();
        } else {
            $now = new \DateTime('now');
            $date = $now->format('YmdHis');
            $patient = new Patient;
            $patient->pid = sprintf('%04d',rand(1, 10)).$date;
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
                $schedule->schedule_time = $start_time;
                $schedule->status = 0;
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

<?php

namespace App\Service;

use App\Http\Resources\PatientCollection;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use DateTime;

class PatientService
{
    /**
     * get total Patient in week
     *
     * @return \Illuminate\Http\Response
     */
    public function getWeekData()
    {
        try {
            $day= [];
            $dataList = [];
            $dayReq = 'now';
            $dayList = [];
            $dayGet = date_format(new DateTime($dayReq), 'Y-m-d');
            $dayofweek = date('w', strtotime($dayGet));
            if( $dayofweek == 0) {
                $dayofweek = 7;
            }
            foreach ([1,2,3,4,5,6,7] as $key => $value) {
                if($value == $dayofweek) {
                    $this->addDataCount($dayGet, $dataList);
                    $this->addDateCount($dayGet, $dayList);
                }else{
                    if($dayofweek > $value) {
                        $dayCount = $dayReq." - ".($dayofweek -$value)." day";
                        $afterDay = date_format(new DateTime($dayCount), 'Y-m-d');
                        $this->addDataCount($afterDay, $dataList);
                        $this->addDateCount($afterDay, $dayList);
                    }else {
                        $dayCount = $dayReq." + ".($value - $dayofweek)." day";
                        $afterDay = date_format(new DateTime($dayCount), 'Y-m-d');
                        if(date_format(new DateTime('now'), 'Y-m-d') >= $afterDay) {
                            $this->addDataCount($afterDay, $dataList);
                        }
                        $this->addDateCount($afterDay, $dayList);
                    }
                }
            }
            $index = 2;
            foreach ($dayList as $key => $value) {
                if($index > 7) {
                    $dayOf = "Chủ nhật"; 
                }else {
                    $dayOf = "Thứ ".$index;
                }
                array_push($day, $dayOf);
                $index ++;
            }
            $responeData = (object)[    
                "date"=> $day,
                "data"=> $dataList
            ];
            return $responeData;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    private function addDataCount($date = null, &$dataList=[])
    {
        return array_push($dataList, count(Patient::whereDate('updated_at',new DateTime($date))->get()));
    }

    private function addDateCount($date = null, &$dayList=[])
    {
        return array_push($dayList, date_format(new DateTime($date),'d/m'));
    }
}

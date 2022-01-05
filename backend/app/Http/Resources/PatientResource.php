<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'pid' => $this->pid,
            'address' => $this->address,
            'phone' => $this->phone,
            'fullname' => $this->fullname,
            'sex' => $this->sex,
            'birthday' => $this->birthday,
            'remark' => $this->remark,
            'prescriptions' => $this->prescriptions
        ];
    }
}

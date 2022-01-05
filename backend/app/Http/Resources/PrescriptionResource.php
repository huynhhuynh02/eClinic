<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionResource extends JsonResource
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
            'user' => $this->user,
            'patient' => $this->patient,
            'prescription_details' => $this->prescription_details,
            'diagnose' => $this->diagnose,
            'total_price' => $this->total_price,
            'remark' => $this->remark
        ];
    }
}

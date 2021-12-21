<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MedicineResource extends JsonResource
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
            'name' => $this->name,
            'user_id' => $this->user_id,
            'quantity' => $this->quantity,
            'price' => $this->price,
            'expired_date' => $this->expired_date,
            'description' => $this->description,
            'create_at' => $this->created_at,
            'unit' => $this->unit,
            'category' => $this->category,
        ];
    }
}

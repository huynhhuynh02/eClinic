<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClinicResource extends JsonResource
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
            'email' => $this->email,
            'address' => $this->address,
            'logo' => $this->logo,
            'is_active' => $this->active_flag,
            'create_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

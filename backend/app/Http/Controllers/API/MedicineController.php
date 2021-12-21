<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\MedicineCollection;
use App\Http\Resources\MedicineResource;
use Illuminate\Http\Request;
use App\Models\Medicine;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //todo:
        $user = auth()->user();

        $id = $user->id;
        $medicines = Medicine::where('user_id', $id)->get();
        return new MedicineCollection($medicines);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $user_id = auth()->id(); 

            $medicine = new Medicine;
            $medicine->unit_id = $request->unit_id;
            $medicine->cate_id = $request->cate_id;
            $medicine->name = $request->name;
            $medicine->user_id = $user_id;
            $medicine->quantity = $request->quantity;
            $medicine->price = $request->price;
            $medicine->expired_date = $request->expired_date;
            $medicine->description = $request->description;
            
            $medicine->save();

        }catch (\Exception $e){
            throw $e;
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
        $medicine = Medicine::find($id);
        if(!$medicine){
            return response()->json(['message'=>'id '.$id.' not found','status'=>'error'],404);
        }
        return new MedicineResource($medicine);
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
            $user_id = auth()->id(); 
            $medicine = Medicine::find($id);

            $medicine->unit_id = $request->unit_id;
            $medicine->cate_id = $request->cate_id;
            $medicine->name = $request->name;
            $medicine->user_id = $user_id;
            $medicine->quantity = $request->quantity;
            $medicine->price = $request->price;
            $medicine->expired_date = $request->expired_date;
            $medicine->description = $request->description;
            
            $medicine->save();
            
            return response()->json([
                'medicine' => $medicine, 
                'status'=>'success'
            ],201);
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
        $medicine = Medicine::find($id);
        if(!$medicine){
            return response()->json(['message'=>'id '.$id.' not found','status'=>'error'],404);
        }
        $medicine->delete();
        return response()->json(['message'=>'delete success','status'=>'success'],201);
    }
}

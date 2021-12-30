<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UnitCollection;
use App\Http\Resources\UnitResource;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id = auth()->id(); 
        $units = Unit::all();
        // $units = Unit::where('parent_id',$id)->get();

        return new UnitCollection($units);
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
            $unit = new Unit;
            $unit->name = $request->name;
            $unit->parent_id = $request->parent_id;
            
            $unit->save();

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
        $unit = Unit::find($id);
        if(!$unit){
            return response()->json(['message'=>'id '.$id.' not found','status'=>'error'],404);
        }
        return new UnitResource($unit);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function update(Request $request, $id )
    {
        try {
            $unit = Unit::find($id);

            $unit->name = $request->name;
            $unit->parent_id = $request->parentId;
            
            $unit->save();
            
            return response()->json([
                'unit' => $unit, 
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
        $unit = Unit::find($id);
        if(!$unit){
            return response()->json(['message'=>'id '.$id.' not found','status'=>'error'],404);
        }
        $unit->delete();
        return response()->json(['message'=>'delete success','status'=>'success'],201);
    }
}



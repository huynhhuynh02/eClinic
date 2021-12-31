<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $id = auth()->id(); 
        $categories = Category::where('user_id',$id)->get();

        return new CategoryCollection($categories);
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
            $user_id = Auth::id(); 

            $cate = new Category;
            $cate->code = $request->code;
            $cate->name = $request->name;
            $cate->parent_id = $request->parent_id;
            $cate->user_id = $user_id;
            
            $cate->save();

            return response()->json([
                'category' => $cate, 
                'status'=>'success'
            ],201);
        }catch (\Exception $e){
            return response()->json([
                'message' => $e, 
                'status'=>'error'
            ],401);
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
        $category = Category::find($id);
        if(!$category){
            return response()->json(['message'=>'id '.$id.' not found','status'=>'error'],404);
        }
        return new CategoryResource($category);
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
            $category = Category::find($id);
            $user_id = Auth::id(); 

            $category->code = $request->code;
            $category->name = $request->name;
            $category->parent_id = $request->parentId;
            $category->user_id = $user_id;
            
            $category->save();
            
            return response()->json([
                'category' => $category, 
                'status'=>'success'
            ],201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e, 
                'status'=>'error'
            ],401);
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
        $cate = Category::find($id);
        if(!$cate){
            return response()->json(['message'=>'id '.$id.' not found','status'=>'error'],404);
        }
        $cate->delete();
        return response()->json(['message'=>'delete success','status'=>'success'],201);
    }
}


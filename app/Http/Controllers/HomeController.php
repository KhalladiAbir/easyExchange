<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB , Hash, Auth;
use App\Http\Requests;

class HomeController extends Controller
{
    /*public function showChangePasswordForm(){
        return view('changepassword');
    }


    /* public function __construct()
    {
        $this->middleware('auth');
        
    } */



    public function changePassword(Request $request){
        $credentials = $request->only('new', 'newBis', 'old');
        
        $rules = [
            'newBis' => 'required',
            'new' => 'required',
            'old' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }

        $old = $request->old;
        $new = $request->new;
        $newBis = $request->newBis;
        $pwd = Auth::user()->password;
        
        if (password_verify($old,$pwd)) {
            if(strcmp($new,$old) != 0){
                if(strcmp($new, $newBis) == 0){

                        $user = Auth::user();

                        if(!is_null($user)){
                            $user->password = bcrypt($new);
                            $user->save();
                            return response()->json(["success"=>true,"message"=>"Password changed successfully !"]);
                        }
                }else{
                    //New passwords are different
                    return response()->json(["success"=>false,"error"=>"New Passwords are different."]);
                }
            }else{
            //Current password and new password are same
            return response()->json(["success"=>false,"error"=>"New Password cannot be same as your current password. Please choose a different password."]);
            }
        }else{
            // Current password is incorrect
            return response()->json(["success"=>false,"error"=>"Your current password does not matches with the password you provided. Please try again."]);
        }

        return response()->json(["success"=>false,"message"=>"couldn't change password"]);
    }
 
}

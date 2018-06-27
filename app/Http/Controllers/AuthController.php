<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB, Hash, Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * API Register
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {

        $credentials = $request->only('username', 'email', 'password'
            ,'first_name','last_name','civility','role'
        );
        
        $rules = [
            'username' => 'required|max:18|unique:users',
            'email' => 'required|email|max:255|unique:users'
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }
        $username = $request->username;
        $email = $request->email;
        $password = $request->password;
        
        $user = User::create(['username' => $username, 'email' => $email, 'password' => Hash::make($password),' force_change_password'=>true,//tho I made its default value true
            'first_name'=>'test',
            'last_name'=>'test',
            'civility'=>'mr',
            'role'=>'test'
        ]);
        $verification_code = str_random(30); //Generate verification code

        DB::table('user_verifications')->insert(['user_id'=>$user->id,'token'=>$verification_code]);
        $subject = "Please verify your email address.";

        Mail::send('verify', ['username' => $username, 'verification_code' => $verification_code],
            
            function($mail) use ($email, $username, $subject){
                $mail->from(getenv('MAIL_USERNAME'), "From EasyExchange");
                $mail->to($email, $username);
                $mail->subject($subject);
            });

        return response()->json(['success'=> true, 'message'=> 'Thanks for signing up! Please check your email to complete your registration.']);
    }

    /**
     * API Verify User
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();
        if(!is_null($check)){
            $user = User::find($check->user_id);

            if($user->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }
            
            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token',$verification_code)->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'You have successfully verified your email address.'
            ]);
        }
        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);
    }

    /**
     * API Login, on success return JWT Auth token
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        
        $rules = [
            'username' => 'required',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);

        if($validator->fails()) {
            return response()->json(['success'=> false, 'error'=> $validator->messages()]);
        }
        
        $credentials['is_verified'] = 1;


        $user = User::where('username',$request->username)->first();

        if($user != null 
            && password_verify($request->password,$user->password)){
            try {
                $token = JWTAuth::attempt($credentials);
            // attempt to verify the credentials and create a token for the user
            /*if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['success' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 401);
                }*/
            } catch (JWTException $e) {
                // something went wrong whilst attempting to encode the token
                return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
            }
            /*
            // all good so return the token
            */
            return response()->json(['success' => true,'user' => $user, 'data'=> [ 'token' => $token ]]); 
        }
        else{
            //return response()->json(['success' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 401);
        }
        
        
        
    }
    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['success' => true, 'message'=> "You have successfully logged out."]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['success' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }
    }

    /**
     * API Recover Password
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }
        /*try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }*/
                    $subject = "Password reset";
                    $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        

        Mail::send('new', ['name' => $name],
            function($mail) use ($email, $name, $subject){
                $mail->from(getenv('MAIL_USERNAME'), "From Bibir");
                $mail->to($email, $name);
                $mail->subject($subject);
            });

        return response()->json([
            'success' => true, 'data'=> ['message'=> 'A reset email has been sent! Please check your email.']
        ]);
    }

    public function userById(Request $request){
        $user = User::where('id',$request->id)->first();
        if(!$user){
            $error_message = "No such user found.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }
        return response()->json([
            'id'=> $user->id,
            'force_change_password' => $user->force_change_password,
            'username' => $user->username,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'role' => $user->role,
            'civility' => $user->civility,
            'is_verified' => $user->is_verified
        ]);
    }

    public function getUser(Request $request){
        $user = User::where('id',$request->id)->first();
        if(!$user){
            $error_message = "No such user found.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }
        return response()->json([
            'id'=> $user->id,
            'force_change_password' => $user->force_change_password,
            'username' => $user->username,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'role' => $user->role,
            'civility' => $user->civility,
            'is_verified' => $user->is_verified
        ]);
    }


    public function userByUsername(Request $request){
        $user = User::where('username',$request->username)->first();
        if(!$user){
            $error_message = "No such user found.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }
        return response()->json([
            'id'=> $user->id,
            'force_change_password' => $user->force_change_password,
            'username' => $user->username,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'role' => $user->role,
            'civility' => $user->civility,
            'is_verified' => $user->is_verified
        ]);
    }

    public function getUsers(Request $request){
        return User::all();
     }

    public function currentUserID(Request $request){
        $user = Auth::user();
        if($user!= null){
            return response()->json(["user"=>Auth::user()]);   
        }
        
    }

    public function changePassword(Request $request){
        
        $user = User::where('id',$request->id)->first();

        if(Hash::check($request->oldpassword , $user->password)){
            $user->password = Hash::make($request->newpassword );
            $user->force_change_password=0;
            $user->save();
            return response()->json(['success' => true , 'user' => $user]);
        }else{
            return response()->json(['success' => false , 'user' => $user]);
        }
    }

     

}

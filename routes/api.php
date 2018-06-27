<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

# GET REQUESTS

Route::get('users','AuthController@getUsers');
Route::get('user/{id}','AuthController@userById');
Route::get('user/{username}','AuthController@userByUsername');
Route::get('currentUserID','AuthController@currentUserID');
Route::get('user/verify/{verification_code}', 'AuthController@verifyUser');
Route::get('logout', 'AuthController@logout');


Route::get('getOperationsAchats','AchatController@getOperationsAchats');
Route::get('getOperationAchat/{id}','AchatController@getOperationAchat');
Route::get('getPays','AchatController@getPays');
Route::get('getNatureOperation','AchatController@getNatureOperation');
Route::get('getNaturePayement','AchatController@getNaturePayement');
Route::get('getDevises','AchatController@getDevises');
Route::get('getQualiteClient','AchatController@getQualiteClient');
Route::get('getNaturePI','AchatController@getNaturePI');
Route::get('getLastSequenceBordereau','AchatController@getLastSequenceBordereau');
Route::get('getLastSequenceBordereauVente','VenteController@getLastSequenceBordereauVente');




/* //relation avec le formulaire de vente
Route::get('getOperationsVentes','VenteController@getOperationsVentes');
Route::get('getOperationVente/{id}','VenteController@getOperationVente');
Route::get('getPays','VenteController@getPays');
Route::get('getDevises','VenteController@getDevises');
Route::get('getQualiteClient','VenteController@getQualiteClient');


 */
Route::get('getNatureDotation','VenteController@getNatureDotation');
Route::get('getReferenceAutorisation','VenteController@getReferenceAutorisation');

//get Excel data
Route::get('getDataExcel','ImportCours@getDataExcel');
Route::get('importExcel','ImportCours@importExcel');
//get banques
Route::get('getBanques','VenteBanqueController@getBanques');


# POST REQUESTS

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
Route::post('recover', 'AuthController@recover');
Route::post('changePassword','HomeController@changePassword');
Route::post('addOperationAchat','AchatController@addOperationAchat');
Route::post('addOperationVente','VenteController@addOperationVente');
Route::post('usere', 'AuthController@getUser');
Route::post('getCRAchats', 'ComptesRendusController@getOperationsAchats');
Route::post('getCRVentes', 'ComptesRendusController@getOperationsVentes');
Route::post('getCRCessions', 'ComptesRendusController@getOperationsCessions');
Route::post('getJournal', 'ComptesRendusController@getJournal');
Route::post('changePassword', 'AuthController@changePassword');
Route::post('updateCours', 'ImportCours@updateCours');
Route::post('addCessionOperation', 'VenteBanqueController@addCessionOperation');



# PUT REQUESTS



# DELETE REQUESTS


	

<?php

namespace App\Http\Controllers;

use App\Http\Requests\TokenGenerateRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request)
    {
        $fields = $request->validated();

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('todo-token')->plainTextToken;

        $response = [
            'user' => new UserResource($user),
            'token' => $token
        ];

        return response($response, 201);
    }

    public function generateToken(TokenGenerateRequest $request)
    {
        $fields = $request->validated();

        $user = User::where('email', $request['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad Credentials'
            ], 401);
        }
        $token = $user->createToken('todo-token')->plainTextToken;

        $response = [
            'user' =>  new UserResource($user),
            'token' => $token
        ];

        return response($response, 201);
    }
    public function destroyToken(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response(['message' => "Token successfully deleted"], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Events\BugReported;
use App\Models\Bug;
use Illuminate\Http\Request;

class BugController extends Controller
{
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'subject' => 'required',
            'description' => 'required',
            'screenshot' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'feedback_type' => 'required|in:Bug,Feature Request,Other',
        ]);

        $path = null;
        if ($request->hasFile('screenshot')) {
            $screenshot = $request->file('screenshot');
            $path = $screenshot->store('screenshots', 'public');
        }

        $bug = new Bug();
        $bug->subject = $validateData['subject'];
        $bug->description = $validateData['description'];
        $bug->screenshot = $path;
        $bug->feedback_type = $validateData['feedback_type'];
        $bug->save();

        event(new BugReported($bug));

        return response()->json([
            'message' => 'Bug created successfully',
            'bug' => $bug,
        ], 201);

        
    }
}
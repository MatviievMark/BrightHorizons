<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        <style>
        .impersonating-banner {
            position: fixed;
            width: 50%;
            background-color: #f44336;
            color: white;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            opacity: 50%;
            z-index: 9999;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .impersonating-banner a {
            color: white;
            text-decoration: underline;
        }
    </style>
    </head>
    <body class="h-screen w-screen  font-sans text-sm md:text-base leading-tight antialiased ligatures-none text-primary bg-gray-light">
        @if (Session::has('impersonating'))
            <div class="impersonating-banner">
                Logged in as {{ Auth::user()->name }},
                <a href="{{ route('stop-impersonating') }}">click here to log back to admin</a>
            </div>
        @endif

        @inertia
    </body>
</html>

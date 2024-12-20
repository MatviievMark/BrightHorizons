<!DOCTYPE html>
<html>
<head>
    <title>Invitation to Join Our App</title>
</head>
<body>
    <h1>Hello {{ $userName }},</h1>
    <p>You have been invited to join our application.</p>
    <p>
        <a href="{{ $invitationUrl }}">Click here to accept the invitation</a>
    </p>
    <p>If you did not expect this invitation, no further action is required.</p>
</body>
</html>
<template>
 <div class="projects" id="pr">
    <h5>8 Projects</h5>
    <div class="p">
        <img src="../res/formnest.png">
        <div class="tools">
            <b>MEVN</b>
            <b>HTML</b>
            <b>CSS</b>
            <b>JS</b>
            <b>NODEMAILER</b>
            <b>CUID</b>
        </div>
        <b>FormNest</b>
        <p>
            Welcome to formNest. This project is Google form clone built using MEVN stack.
            This is responsive website.
            I used nodemailer for OTP functionality and I used CUID for creating unique IDs 
            for users at server side. Using this We can create forms and you can
            set form visibilty and set limit for form accessbility for users and share the
            form link like google form link and form visitor can fill the form and submit that form. And form provider
            can view submitted data through admin portal.
        </p>
        <a href="https://github.com/JaiSanjay74/Formnest">View Live Application</a>
    </div>
    <div class="p">
        <img src="../res/galaxy.png">
        <div class="tools">
            <b>MEVN</b>
            <b>HTML</b>
            <b>CSS</b>
            <b>JS</b>
            <b>NODEMAILER</b>
            <b>CUID</b>
        </div>
        <b>Galaxy - A Social media platform</b>
        <p>
            Welcome to our Galaxy social media platform. I was inspired by 
            Twitter. Then I started building this project. It was my favourite MEVN stack project.Becuase It is full 
            functional secure real world 
            social media responsive web application. It had functionalities such as 
            Authentication (Signup,Signin,Signout,forget password (OTP based verification)),Core features (New post,Delete post
            ,Home posts listed based on user engagement using power of mongodb queries at server side 
            ,Reply to post,like or unlike post,like or unlike replys,no.of likes or unlikes for posts and replys,
            followers listing,followings listing,Searching users Using GID (Galaxy ID),other users profile viewing)
            ,Account management (Upload profile image,Update account,Delete account,
            Followers visibility,Change password with secure verification).
            Security - I was implemented strong security using RSA and AES encryption standard mechanism
            called Hybrid Encryption Mechanism. It means here data transferation between Both the client and server is encrypted by Hybrid 
            Encryption Mechanism. And here we used JWT (JSON Web Token) for secure Authentication for user login system.
            Here we used Bcrypt for storing hashed password which is given by user.So passwords are securely hashed and stored on mongodb
            securely.
        </p>
        <a href="https://github.com/JaiSanjay74/Galaxy">View Live Application</a>
    </div>
    <div class="p">
        <img src="../res/arulfoods.png">
        <div class="tools">
            <b>HTML</b>
            <b>CSS</b>
            <b>JS</b>
            <b>NODE JS</b>
            <b>MONGO DB</b>
            <b>EXPRESS JS</b>
            <b>NODEMAILER</b>
            <b>WEB PUSH</b>
        </div>
        <b>ArulFoods - A E-Commerce website</b>
        <p>
            Welcome to ArulFoods. This was my first project. This was a responsive full stack web application built using plain html,css,js for front and 
            And I used Nodejs,ExpressJS and MongoDB at the Backend server. This website communicate to our server through REST API using
            fetch() API. Core functionality (ordering foods (Not real payment transaction),listing available foods,listing orders,listing cart items),
            Authentication(Signin,Signout,signup,forgetpassword (OTP based verification (Not security implementation))),Account
            Management(Updating account,Delete account). We used web push for admin order notification system. When user ordered 
            specific food then server automatically send notification to me about the ordered product if I registered order alarm in the 
            admin settings panel. here not admin panel fully built only order notification was built using push notification with service worker
            for background tasks even browser closed. 
        </p>
        <a href="https://github.com/JaiSanjay74/ArulFoods">View Live Application</a>
    </div>
    <div class="p">
        <img src="../res/wavechat.png">
        <div class="tools">
            <b>HTML</b>
            <b>CSS</b>
            <b>JS</b>
            <b>MEVN</b>
            <b>NODEMAILER</b>
            <b>WEBSOCKET</b>
        </div>
        <b>Wave Chat - A Realtime chat application</b>
        <p>
            Welcome to Wavechat. This was my first project which was done after completed vuejs learning.But Unfortunately,
            It was permently deleted due to my laptop reset (Windows 11 recovery key). But it has functionalities namely Core functions(
            realtime chat between two users, users can view already posted chats in the future it means chats stored on mongodb.)
            Contact management (Adding contacts, Updating contacts (name and wave ID), Deleting conctacts), Account management(
            Updating account credentials, Deleting account), Authentication (signup,signin,signout,
            forget password with secure verification (OTP based)). Here UI is awesome. becuase This UI tells that is a great chat app.
            Becuase This UI was specificaly designed for real time chat app and this UI theme was used by most developers.  
        </p>
    </div>
    <div class="p">
        <img src="../res/isysway.png">
        <div class="tools">
            <b>HTML</b>
            <b>CSS</b>
            <b>JS</b>
            <b>MERN</b>
            <b>NODEMAILER</b>
        </div>
        <b>Online Student Quizz system - Isysway company project</b>
        <p>
            Welcome to Quizz project. This was my first company given project. It is online quizz system. It has features such as 
            Admin features(add course, student management(add,delete,update student account credentials)), 
            Quizz mangement (add quizz,update quizz,delete quizz), signin,signout, admin key manage), 
            Student features(attend quizz, randam quizz generation, view scores later, signin,signout, signup, forgetpassword
             system via email).  
        </p>
    </div>
    <div class="p">
        <img src="../res/java_notepad.png">
        <div class="tools">
            <b>JAVA</b>
            <b>SWING FRAMEWORK</b>
        </div>
        <b>Notepad - A Java Swing GUI project</b>
        <p>
            Welcome to Notepad project. This is my first first project after entred into the programming journey.
            After learned java completely (in-depthly), I built one GUI notepad windows application
            in Java Swing framework. It has features such as create file, open file, delete file, create multiple files 
            by opening multiple windows, save and save as. If you see through this image not attract 
            you becuase image quality is very less. but if you go to my github profile and download our applciation and run 
            with java 8. now you see full featured notepad. Why I used java 8 means I built this app in school 11th std
            started after 1 month I built this application at that time java 8 is standard release.   
        </p>
    </div>
 </div>
</template>
<style src="../css/Projects.css" scoped>
</style>
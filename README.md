# Jk

This project  was  Angular Frontend (User Interface for Management and Q&A);


-For run this frontend you need to run backend first.
-run npm i for install packages.
-then run  ng serve  command;



Project Description:- 

It basically have 4 roles :-
 1. Admin - change the User Role.(save in DB)
 2. Normal - by default any user signup it become Normal user,  can asked question till admin not change the role (save in DB)
 3. Developer- only Admin can make as Developer , role is to  Ingestion Management(datasave in DB)
 4. HR-only Admin can make as HR , role is to  Upload Document(only in frontend) 


for admin login :-
  email: admin@gmail.com
  password:admin@123A



code :- 
 -In main module we have login , signup components and having common service ,with auth auth service;
 - User module - have all rest of thing but call main module common service.

 I used boootstrap and angulat material design and some basic CSS




## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


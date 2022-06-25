# GIRS Challenge


### Deployment
See the deployed project here: https://boiling-cove-34587.herokuapp.com

---
### Local Installation and Setup
#### Dependencies
- node.js
- Python (pip)

#### Frontend Instructions
```
cd frontend
npm i
npm start
```

#### Backend Instructions
```
cd backend
pip install -r requirements.txt
python manage.py runserver
```
---
### Challenge Specifications


- [x] Login Authentication and Authorization
- [x] Users should not be able to see the map if they are not logged in
- [x] Users should be able to log out
- [x] Design a Django Rest framework backend that will store the line data.
- [x] Ability to retrieve multiple lines at once
- [x] Calculate risk of failure by multiplying weather data, vegetation data, and wear together and send this information to the frontend 
- [x] Render Lines on Frontend and color red or green based on threshold, default at 0.5
- [x] Lines will be red if they are greater than or equal to risk of failure, otherwise they will be green. 
- [x] User should be able to update the threshold on the frontend and the lines should
change colors when it is done.
- [x] Create a button called ‘Update Threshold’ that will open a pop-up
where the value can be updated.
- [x] Users should not be able to add values below 0 or above 1

Bonus
- [x] Create endpoint to add new lines, delete lines, and update
- [x] The updated threshold value should be persisted
- [x] Ability to paginate lines 50 at a time
- [x] Create a pop when a line is clicked that shows the failure rate and name of the line
- [x] App deployed

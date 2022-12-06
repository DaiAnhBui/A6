const Sequelize = require('sequelize');
var sequelize = new Sequelize('egjcvjvk', 'egjcvjvk', '9yzDmF_GxGkE3cQ651ykC8G5UsyoUN0i', {
 host: 'peanut.db.elephantsql.com',
 dialect: 'postgres',
 port: 5432,
 dialectOptions: {
 ssl: { rejectUnauthorized: false }
 },
 query:{ raw: true }
});
// const fs = require("fs");

// class Data{
//     constructor(students, courses){
//         this.students = students;
//         this.courses = courses;
//     }
// }

// let dataCollection = null;

var Student = sequelize.define('Student', {
    studentNum: {   type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true               
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
});

var Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
});

Course.hasMany(Student, {foreignKey: 'course'});

module.exports.initialize = function () {
    // return new Promise( (resolve, reject) => {
    //     fs.readFile('./data/courses.json','utf8', (err, courseData) => {
    //         if (err) {
    //             reject("unable to load courses"); return;
    //         }

    //         fs.readFile('./data/students.json','utf8', (err, studentData) => {
    //             if (err) {
    //                 reject("unable to load students"); return;
    //             }

    //             dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
    //             resolve();
    //         });
    //     });
    // });
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function() {
            }).then(function() {
                resolve('successfully');
            }).catch(function(){
                reject('unable to sync the database');
            });
        });
}

module.exports.getAllStudents = function(){
    // return new Promise((resolve,reject)=>{
    //     if (dataCollection.students.length == 0) {
    //         reject("query returned 0 results"); return;
    //     }

    //     resolve(dataCollection.students);
    // })
    return new Promise(function (resolve, reject) {

        sequelize.sync().then(function(){
            Student.findAll({
            }).then(function(){
                resolve(data);
            }).catch(function(){
                reject('no results returned');
            }); 
        });
    });
       
}

module.exports.getCourses = function(){
//    return new Promise((resolve,reject)=>{
//     if (dataCollection.courses.length == 0) {
//         reject("query returned 0 results"); return;
//     }

//     resolve(dataCollection.courses);
//    });
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function(){
            Course.findAll({
            }).then(function(){
                resolve(data);
            }).catch(function(){
                reject('no results returned');
            }); 
        });
   });
   
};

module.exports.getStudentByNum = function (num) {
    // return new Promise(function (resolve, reject) {
    //     var foundStudent = null;

    //     for (let i = 0; i < dataCollection.students.length; i++) {
    //         if (dataCollection.students[i].studentNum == num) {
    //             foundStudent = dataCollection.students[i];
    //         }
    //     }

    //     if (!foundStudent) {
    //         reject("query returned 0 results"); return;
    //     }

    //     resolve(foundStudent);
    // });
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function(){
            Student.findAll({
                where : {studentNum: num}
            }).then(function(){
                resolve(num[0]);
            }).catch(function(){
                reject('no results returned');
            }); 
        });
    });
       
};

module.exports.getStudentsByCourse = function (course) {
    // return new Promise(function (resolve, reject) {
    //     var filteredStudents = [];

    //     for (let i = 0; i < dataCollection.students.length; i++) {
    //         if (dataCollection.students[i].course == course) {
    //             filteredStudents.push(dataCollection.students[i]);
    //         }
    //     }

    //     if (filteredStudents.length == 0) {
    //         reject("query returned 0 results"); return;
    //     }

    //     resolve(filteredStudents);
    // });
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function(){
            Student.findAll({
                where: {Course: course}
            }).then(function(){
                resolve('data');
            }).catch(function(){
                reject('no results returned');
            }); 
        });
    });
       
};

module.exports.getCourseById = function (id) {
    // return new Promise(function (resolve, reject) {
    //     var foundCourse = null;

    //     for (let i = 0; i < dataCollection.courses.length; i++) {
    //         if (dataCollection.courses[i].courseId == id) {
    //             foundCourse = dataCollection.courses[i];
    //         }
    //     }

    //     if (!foundCourse) {
    //         reject("query returned 0 results"); return;
    //     }

    //     resolve(foundCourse);
    // });
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function(){
            Course.findAll({
                where: {courseId: id}
            }).then(function(){
                resolve('successfully resolve ' + num[0]);
            }).catch(function(){
                reject('no results returned');
            }); 
        });
    });
       
};

module.exports.addStudent = function (studentData) {
    // return new Promise(function (resolve, reject) {

    studentData.TA = (studentData.TA) ? true : false;
    //     studentData.studentNum = dataCollection.students.length + 1;
    //     dataCollection.students.push(studentData);
    for(var x in studentData) {
        if(x == "") {
            x = null;
        }
    }
    //     resolve();
    // });
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function() {
            Student.create({
            }).then(function (course) {
                resolve('successfully');
            }).catch(function(error){
                reject('unable to create student');
            });

        });
    });
       
};

module.exports.updateStudent = function (studentData) {
    // return new Promise(function (resolve, reject) {

    studentData.TA = (studentData.TA) ? true : false;

    //     for(let i=0; i < dataCollection.students.length; i++){
    //         if(dataCollection.students[i].studentNum == studentData.studentNum){
    //             dataCollection.students[i] = studentData;
    //         }
    //     }
    //     resolve();
    // });



    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function() {
            Student.update({
                where: {studentNum: studentData.studentNum}
            }).then(function () {
                resolve('successfully');
            }).catch(function(){
                reject('unable to update student');
            });
        });
    });
       
};

//////////////////////////////////////////////////////////////////////////////////////////////
module.exports.addCourse = function (courseData) {
    courseData.TA = (courseData.TA) ? true : false;

    for(var x in courseData) {
        if(x == "") {
            x = null;
        }
    }

    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function() {
            Course.create({
            }).then(function () {
                resolve('successfully');
            }).catch(function(){
                reject('unable to create course');
            });

        });
    });
       
};

module.exports.updateCourse = function (courseData) {
    courseData.TA = (courseData.TA) ? true : false;

    for(var x in courseData) {
        if(x == "") {
            x = null;
        }
    }

    return new Promise(function (resolve, reject) {
        sequelize.sync().then(function() {
            Course.update({
                where: {courseId: courseData.courseId}
            }).then(function () {
                resolve('successfully');
            }).catch(function(){
                reject('unable to update course');
            });

        });
    });
       
};

module.exports.deleteCourseById = function (id) {
    

    return new Promise(function (resolve, reject) {
        Course.destroy({
            where: { courseId: id }
        }).then(function(){
            resolve('successfully removed the courses');
        }).catch(function(){
            reject('Unable to delete the courses');
        });
    });
       
};

module.exports.deleteStudentByNum = function(num) {
    return new Promise(function(resolve, reject) {
        Student.destroy({
            where: {studentNum: num}
        }).then(function(){
            resolve('successfully removed the student');
        }).catch(function(){
            reject('Unable to delete the courses');
        });
    })
}



const dbs = require('../models/dbs')

// let attendance = 'table_5'
// let users = 'users'
let subjects = 'subjects'
let branch = 't_branch_dip'
let sem = 't_sem_'
let dummy_attendance = `d_4`

module.exports = {
    getDummy: async(request,response)=>{
        // for (let i = 0; i < 100; i++) {
        //     let data = await dbs.queries([`insert into ${dummy_attendance} values (${i}, 22021306010${i}, 'xyz');`])
        // }
        let data = await dbs.queries([`select sr_no, Enrollment_no, Student_name from ${dummy_attendance} where sr_no > 0`])
        console.log(data[0])
        response.render('dymmy.ejs', {user_id: request.session.user_id, send_data: "null", error: "noError", attendance: data[0]})
    },

    courses: async(request,response)=>{
        // let fakeData = {'name': 'name'}
        
        console.log(request.body)
        let data = await dbs.queries([`select * from ${branch};`, `select * from ${sem}${request.body.value};`])
        let branch_data = data[0]
        let sem_data = data[1]
        let send_data = {
            'branch': branch_data,
            'sem': sem_data
        }
        response.json(send_data)
        // response.render('dymmy.ejs', {send_data: send_data, error: "send_data"})
    },

    addAttendance: async(req, res) => {
        // let keys = Object.keys(req.body)
        // keys.forEach(async(key) => {
        //     if (key != "course" || key != "branch" || key != "sem") {
        //     }
        // });
        let data = await dbs.dummy([`select * from dummy_1`], ['CREATE TABLE dummy_1 AS SELECT * FROM d_4;'],"dummy_1")
        console.log(data)
    },

    getHome: (request,response)=>{
        response.render('hod_home.ejs', {user_id: request.session.user_id})
    },

    create_subject: (request,response)=>{
        response.render('create_subjects.ejs', { message: "data" ,user_id: request.session.user_id,})
    },

    update_subject: (request,response)=>{
        response.render('update_subject.ejs', { message: "data" ,user_id: request.session.user_id,})
    },

    delete_subject: (request,response)=>{
        response.render('delete_subject.ejs', { message: "data" ,user_id: request.session.user_id,})
    },

    show_subject: async (request, response) => {
        let data = await dbs.queries([`select * from ${subjects};`])
        console.log(data)
        response.render('show_subjects.ejs', { result_subjects: data[0] ,user_id: request.session.user_id,})
    },

    createSubject: async (request, response) => {
        let data = await dbs.queries([`insert into ${subjects} values('${request.body.subject_name}');`, `select distinct * from users;`])
        response.render('subject_created.ejs', { subject_name: request.body.subject_name ,user_id: request.session.user_id,})
    },

    updateSubject: async (request, response) => {
        let data = await dbs.queries([`update ${subjects} set name = '${request.body.new_name}' where name = '${request.body.previous_name}';`, 'select * from subjects'])
        response.render('show_subjects.ejs', { result_subjects: data[1][0] ,user_id: request.session.user_id,})
    },

    deleteSubject: async (request, response) => {
        let data = await dbs.queries([`delete from ${subjects} where name = '${request.body.subject_name}';`, 'select * from subjects', `select distinct * from users;`])
        response.redirect("/show_subject")
    },
    logout: (request, response) => {
        request.session.destroy((err) => {
            if(err) throw err;
            response.redirect('/')
        })
    }
}



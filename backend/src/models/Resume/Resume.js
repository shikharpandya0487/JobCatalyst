const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resumeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    skills: {
        type: String
    },
    exp1_org: {
        type: String
    },
    exp1_pos: {
        type: String
    },
    exp1_desc: {
        type: String
    },
    exp1_dur: {
        type: String
    },
    exp2_org: {
        type: String
    },
    exp2_pos: {
        type: String
    },
    exp2_desc: {
        type: String
    },
    exp2_dur: {
        type: String
    },
    proj1_title: {
        type: String
    },
    proj1_link: {
        type: String
    },
    proj1_desc: {
        type: String
    },
    proj2_title: {
        type: String
    },
    proj2_link: {
        type: String
    },
    proj2_desc: {
        type: String
    },
    edu1_school: {
        type: String
    },
    edu1_year: {
        type: String
    },
    edu1_qualification: {
        type: String
    },
    edu1_desc: {
        type: String
    },
    edu2_school: {
        type: String
    },
    edu2_year: {
        type: String
    },
    edu2_qualification: {
        type: String
    },
    edu2_desc: {
        type: String
    },
    extra_1: {
        type: String
    },
    extra_2: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;

const Survey = require('../../models/bukutamu/survey');
const response = require('../../models/bukutamu/response');

const CreateSurvey = async (body, res) => {
    try {
        const survey = await Survey.create(body);
        res.status(201).json(response(survey, "Survey created successfully", 201));
    } catch (err) {
        res.status(500).json(response(null, "Failed to create survey", 500));
    }
}

module.exports = CreateSurvey;
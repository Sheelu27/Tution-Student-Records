const tutorsData = require("../Models/student");

const getStudentData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const filter = (req.query.gender && { gender: req.query.gender }) || {};
  const sort =
    (req.query.age !== undefined && { studentAge: req.query.age }) || {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};
  results.totalCount = await tutorsData
    .find({ Owner: req.params.email, ...filter })
    .sort(sort)
    .countDocuments()
    .exec();
  if (
    endIndex <
    (await tutorsData.find({ Owner: req.params.email }).countDocuments().exec())
  ) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  tutorsData
    .find({ Owner: req.params.email, ...filter })
    .sort(sort)
    .limit(limit)
    .skip(startIndex)
    .then((item) =>
      res.status(200).json({ item: item, totalCount: results.totalCount })
    )
    .catch((err) =>
      res.status(400).json({ message: "Failed to extract the Information" })
    );
};

const getStudentByName = (req, res) => {
  tutorsData
    .findOne({ Owner: req.query.email, studentName: req.query.name })
    .then((item) => res.status(200).json(item))
    .catch((err) =>
      res.status(400).json({ message: "Failed to extract the Information" })
    );
};

const deleteStudent = async (req, res) => {
  tutorsData
    .findOneAndDelete({ registrationNo: req.query.id })
    .then((res) => res.json({ message: "Success" }));
};

module.exports = {
  getStudentData,
  getStudentByName,
  deleteStudent,
};

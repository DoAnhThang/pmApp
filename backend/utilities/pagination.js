const paginateData = async (model, page, pageSize) => {
  try {
    const totalRecords = await model.countDocuments();
    if (totalRecords === 0) {
      return { error: "Not found" };
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalRecords / pageSize);
      if (page > totalPages) page--;
      const paginatedData = await model
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      return {
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalRecords,
      };
    } else {
      const data = await model.find({}, "_id name");
      return { data };
    }
  } catch (error) {
    next(error);
  }
};

const paginateDataWithPopulate = async (
  model,
  page,
  pageSize,
  populateOptions,
  findFields
) => {
  try {
    const totalRecords = await model.countDocuments();
    if (totalRecords === 0) {
      return { msg: `Not found ${model.modelName}` };
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalRecords / pageSize);
      if (page > totalPages) page--;
      const paginatedData = await model
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate(populateOptions);
      return {
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalRecords,
      };
    } else {
      const data = await model.find({}, findFields);
      return { success: true, data: data };
    }
  } catch (error) {
    next(error);
  }
};

module.exports.paginateData = paginateData;
module.exports.paginateDataWithPopulate = paginateDataWithPopulate;

const updateFieldInModel = async (
  field,
  model,
  fieldId,
  documentIdsNeedToUpdate
) => {
  try {
    // Xóa fieldId khỏi thuộc tính field của document
    await model.updateMany(
      { [field]: fieldId },
      { $pull: { [field]: fieldId } }
    );

    // Thêm lại fieldId vào thuộc tính field của document có _id thuộc mảng documentIdsNeedToUpdate
    await model.updateMany(
      { _id: { $in: documentIdsNeedToUpdate } },
      { $push: { [field]: fieldId } }
    );
  } catch (error) {
    next(error);
  }
};

const removeDocumentAndUpdateModels = async (
  Model,
  documentId,
  modelsNeedUpdateField
) => {
  try {
    const document = await Model.findById(documentId);
    if (!document) {
      return { errorMsg: `Not found the ${Model.modelName}` };
    }
    await Model.findByIdAndRemove(documentId);

    // Xóa documentId khỏi thuộc tính fieldX của modelX
    for (const { model, field } of modelsNeedUpdateField) {
      await model.updateMany(
        { [field]: documentId },
        { $pull: { [field]: documentId } }
      );
    }
    return {
      success: true,
      msg: "Deleted successfully!",
    };
  } catch (error) {
    next(error);
  }
};

module.exports.updateFieldInModel = updateFieldInModel;
module.exports.removeDocumentAndUpdateModels = removeDocumentAndUpdateModels;

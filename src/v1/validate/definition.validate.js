const validate = {};

validate.validateCreate = (doc) => {
  if (Object.keys(doc).length != 7) return false;
  let {
    title,
    definition,
    category,
    exampleUsage,
    partOfSpeech,
    rarity,
    spellingVariations,
  } = doc;
  title = typeof title == "string" && title.trim() != "" ? title.trim() : false;
  definition =
    typeof definition == "string" && definition.trim() != ""
      ? definition.trim()
      : false;
  category =
    typeof category == "string" && category.trim() != ""
      ? category.trim()
      : false;
  exampleUsage =
    typeof exampleUsage == "string" && exampleUsage.trim() != ""
      ? exampleUsage.trim()
      : false;
  partOfSpeech =
    typeof partOfSpeech == "string" && partOfSpeech.trim() != ""
      ? partOfSpeech.trim()
      : false;
  rarity =
    typeof rarity == "string" && rarity.trim() != "" ? rarity.trim() : false;
  spellingVariations =
    typeof spellingVariations == "string" && spellingVariations.trim() != ""
      ? spellingVariations.trim()
      : spellingVariations == null
      ? null
      : false;

  if (
    !(
      title &&
      definition &&
      category &&
      exampleUsage &&
      partOfSpeech &&
      rarity &&
      spellingVariations != false
    )
  ) {
    return false;
  }
  return true;
};

validate.validateGetByTitle = (params) => {
  let { title } = params;
  title = typeof title == "string" && title.trim() != "" ? title.trim() : false;
  if (!title) return false;
  return true;
};

validate.validateGetById = (params) => {
  let { id } = params;
  id = typeof id == "string" && id.trim() != "" ? id.trim() : false;
  if (!id) return false;
  return true;
};

module.exports = validate;

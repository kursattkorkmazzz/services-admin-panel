type DirtyFieldsType = {
  [key: string]: object | boolean;
};
type AllValuesType = {
  [key: string]: any;
};

export default function GetDirtyValues(
  dirtyFields: DirtyFieldsType,
  allValues: AllValuesType
): object {
  let changedValued: any = {};

  Object.keys(dirtyFields).map((key: string) => {
    if (dirtyFields[key] instanceof Object) {
      changedValued[key] = GetDirtyValues(
        dirtyFields[key] as DirtyFieldsType,
        allValues[key]
      );
    } else {
      if (dirtyFields[key]) {
        changedValued[key] = allValues[key];
      }
    }
  });

  return changedValued;
}

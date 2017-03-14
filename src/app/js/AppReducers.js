import AppCategoryReducer from '../-category/js/AppCategoryReducer';
import FormFieldReducer from '../-form/-fields/js/FormFieldReducer';
import AppFormReducer from '../-form/js/AppFormReducer';
import CataloguingManualEntryReducer from '../-cataloging/-manual-entry/js/ManualEntryReducer';
import CataloguingOnlineSearchReducer from '../-cataloging/-online-search/js/OnlineSearchReducer';
import CatalogingCardCatalogReducer from '../-cataloging/-card-catalog/js/CardCatalogReducer';
export const CategoryReducer = AppCategoryReducer;
export const FieldReducer = FormFieldReducer;
export const FormReducer = AppFormReducer;
export const OnlineSearchReducer = CataloguingOnlineSearchReducer;
export const ManualEntryReducer = CataloguingManualEntryReducer;
export const CardCatalogReducere = CatalogingCardCatalogReducer;
import { PropertyBrand, PropertyColor, PropertyFuel, PropertyStatus, PropertyTransmission, } from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	propertyTransmission: PropertyTransmission;
	propertyStatus: PropertyStatus;
	propertyBrand: PropertyBrand;
	propertyColor: PropertyColor;
	propertyFuel: PropertyFuel;
	propertyOdometer: number;
	propertyAddress: string;
	propertyTitle: string;
	propertyPrice: number;
	propertyYear: number;
	propertyViews: number;
	propertyLikes: number;
	propertyComments: number;
	propertyRank: number;
	propertyImages: string[];
	propertyDesc?: string;
	propertySell: boolean;
	propertyRent: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Properties {
	list: Property[];
	metaCounter: TotalCounter[];
}

import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RestaurantModel = runtime.Types.Result.DefaultSelection<Prisma.$RestaurantPayload>;
export type AggregateRestaurant = {
    _count: RestaurantCountAggregateOutputType | null;
    _min: RestaurantMinAggregateOutputType | null;
    _max: RestaurantMaxAggregateOutputType | null;
};
export type RestaurantMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    address: string | null;
    imageUrl: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RestaurantMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    address: string | null;
    imageUrl: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RestaurantCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    address: number;
    imageUrl: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RestaurantMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    imageUrl?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RestaurantMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    imageUrl?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RestaurantCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    imageUrl?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RestaurantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RestaurantCountAggregateInputType;
    _min?: RestaurantMinAggregateInputType;
    _max?: RestaurantMaxAggregateInputType;
};
export type GetRestaurantAggregateType<T extends RestaurantAggregateArgs> = {
    [P in keyof T & keyof AggregateRestaurant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRestaurant[P]> : Prisma.GetScalarType<T[P], AggregateRestaurant[P]>;
};
export type RestaurantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithAggregationInput | Prisma.RestaurantOrderByWithAggregationInput[];
    by: Prisma.RestaurantScalarFieldEnum[] | Prisma.RestaurantScalarFieldEnum;
    having?: Prisma.RestaurantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RestaurantCountAggregateInputType | true;
    _min?: RestaurantMinAggregateInputType;
    _max?: RestaurantMaxAggregateInputType;
};
export type RestaurantGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    address: string;
    imageUrl: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: RestaurantCountAggregateOutputType | null;
    _min: RestaurantMinAggregateOutputType | null;
    _max: RestaurantMaxAggregateOutputType | null;
};
export type GetRestaurantGroupByPayload<T extends RestaurantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RestaurantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RestaurantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RestaurantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RestaurantGroupByOutputType[P]>;
}>>;
export type RestaurantWhereInput = {
    AND?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    OR?: Prisma.RestaurantWhereInput[];
    NOT?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    id?: Prisma.StringFilter<"Restaurant"> | string;
    name?: Prisma.StringFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    address?: Prisma.StringFilter<"Restaurant"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    userId?: Prisma.StringFilter<"Restaurant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    categories?: Prisma.CategoryListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
};
export type RestaurantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    categories?: Prisma.CategoryOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
};
export type RestaurantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    OR?: Prisma.RestaurantWhereInput[];
    NOT?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    name?: Prisma.StringFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    address?: Prisma.StringFilter<"Restaurant"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    userId?: Prisma.StringFilter<"Restaurant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    categories?: Prisma.CategoryListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
}, "id">;
export type RestaurantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RestaurantCountOrderByAggregateInput;
    _max?: Prisma.RestaurantMaxOrderByAggregateInput;
    _min?: Prisma.RestaurantMinOrderByAggregateInput;
};
export type RestaurantScalarWhereWithAggregatesInput = {
    AND?: Prisma.RestaurantScalarWhereWithAggregatesInput | Prisma.RestaurantScalarWhereWithAggregatesInput[];
    OR?: Prisma.RestaurantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RestaurantScalarWhereWithAggregatesInput | Prisma.RestaurantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    address?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Restaurant"> | Date | string;
};
export type RestaurantCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRestaurantsInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRestaurantsNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RestaurantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantListRelationFilter = {
    every?: Prisma.RestaurantWhereInput;
    some?: Prisma.RestaurantWhereInput;
    none?: Prisma.RestaurantWhereInput;
};
export type RestaurantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RestaurantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RestaurantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RestaurantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RestaurantScalarRelationFilter = {
    is?: Prisma.RestaurantWhereInput;
    isNot?: Prisma.RestaurantWhereInput;
};
export type RestaurantCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutUserInput, Prisma.RestaurantUncheckedCreateWithoutUserInput> | Prisma.RestaurantCreateWithoutUserInput[] | Prisma.RestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutUserInput | Prisma.RestaurantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RestaurantCreateManyUserInputEnvelope;
    connect?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
};
export type RestaurantUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutUserInput, Prisma.RestaurantUncheckedCreateWithoutUserInput> | Prisma.RestaurantCreateWithoutUserInput[] | Prisma.RestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutUserInput | Prisma.RestaurantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RestaurantCreateManyUserInputEnvelope;
    connect?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
};
export type RestaurantUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutUserInput, Prisma.RestaurantUncheckedCreateWithoutUserInput> | Prisma.RestaurantCreateWithoutUserInput[] | Prisma.RestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutUserInput | Prisma.RestaurantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RestaurantUpsertWithWhereUniqueWithoutUserInput | Prisma.RestaurantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RestaurantCreateManyUserInputEnvelope;
    set?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    disconnect?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    delete?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    connect?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    update?: Prisma.RestaurantUpdateWithWhereUniqueWithoutUserInput | Prisma.RestaurantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RestaurantUpdateManyWithWhereWithoutUserInput | Prisma.RestaurantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RestaurantScalarWhereInput | Prisma.RestaurantScalarWhereInput[];
};
export type RestaurantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutUserInput, Prisma.RestaurantUncheckedCreateWithoutUserInput> | Prisma.RestaurantCreateWithoutUserInput[] | Prisma.RestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutUserInput | Prisma.RestaurantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RestaurantUpsertWithWhereUniqueWithoutUserInput | Prisma.RestaurantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RestaurantCreateManyUserInputEnvelope;
    set?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    disconnect?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    delete?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    connect?: Prisma.RestaurantWhereUniqueInput | Prisma.RestaurantWhereUniqueInput[];
    update?: Prisma.RestaurantUpdateWithWhereUniqueWithoutUserInput | Prisma.RestaurantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RestaurantUpdateManyWithWhereWithoutUserInput | Prisma.RestaurantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RestaurantScalarWhereInput | Prisma.RestaurantScalarWhereInput[];
};
export type RestaurantCreateNestedOneWithoutCategoriesInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutCategoriesInput, Prisma.RestaurantUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutCategoriesInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutCategoriesInput, Prisma.RestaurantUncheckedCreateWithoutCategoriesInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutCategoriesInput;
    upsert?: Prisma.RestaurantUpsertWithoutCategoriesInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutCategoriesInput, Prisma.RestaurantUpdateWithoutCategoriesInput>, Prisma.RestaurantUncheckedUpdateWithoutCategoriesInput>;
};
export type RestaurantCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.RestaurantUpsertWithoutOrdersInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutOrdersInput, Prisma.RestaurantUpdateWithoutOrdersInput>, Prisma.RestaurantUncheckedUpdateWithoutOrdersInput>;
};
export type RestaurantCreateWithoutUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutUserInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutUserInput, Prisma.RestaurantUncheckedCreateWithoutUserInput>;
};
export type RestaurantCreateManyUserInputEnvelope = {
    data: Prisma.RestaurantCreateManyUserInput | Prisma.RestaurantCreateManyUserInput[];
};
export type RestaurantUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutUserInput, Prisma.RestaurantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutUserInput, Prisma.RestaurantUncheckedCreateWithoutUserInput>;
};
export type RestaurantUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutUserInput, Prisma.RestaurantUncheckedUpdateWithoutUserInput>;
};
export type RestaurantUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RestaurantScalarWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateManyMutationInput, Prisma.RestaurantUncheckedUpdateManyWithoutUserInput>;
};
export type RestaurantScalarWhereInput = {
    AND?: Prisma.RestaurantScalarWhereInput | Prisma.RestaurantScalarWhereInput[];
    OR?: Prisma.RestaurantScalarWhereInput[];
    NOT?: Prisma.RestaurantScalarWhereInput | Prisma.RestaurantScalarWhereInput[];
    id?: Prisma.StringFilter<"Restaurant"> | string;
    name?: Prisma.StringFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    address?: Prisma.StringFilter<"Restaurant"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    userId?: Prisma.StringFilter<"Restaurant"> | string;
    createdAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
};
export type RestaurantCreateWithoutCategoriesInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRestaurantsInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutCategoriesInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutCategoriesInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutCategoriesInput, Prisma.RestaurantUncheckedCreateWithoutCategoriesInput>;
};
export type RestaurantUpsertWithoutCategoriesInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutCategoriesInput, Prisma.RestaurantUncheckedUpdateWithoutCategoriesInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutCategoriesInput, Prisma.RestaurantUncheckedCreateWithoutCategoriesInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutCategoriesInput, Prisma.RestaurantUncheckedUpdateWithoutCategoriesInput>;
};
export type RestaurantUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRestaurantsNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutCategoriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRestaurantsInput;
    categories?: Prisma.CategoryCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    categories?: Prisma.CategoryUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutOrdersInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
};
export type RestaurantUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutOrdersInput, Prisma.RestaurantUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutOrdersInput, Prisma.RestaurantUncheckedUpdateWithoutOrdersInput>;
};
export type RestaurantUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRestaurantsNestedInput;
    categories?: Prisma.CategoryUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateManyUserInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    imageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RestaurantUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    categories?: Prisma.CategoryUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantCountOutputType = {
    categories: number;
    orders: number;
};
export type RestaurantCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    categories?: boolean | RestaurantCountOutputTypeCountCategoriesArgs;
    orders?: boolean | RestaurantCountOutputTypeCountOrdersArgs;
};
export type RestaurantCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantCountOutputTypeSelect<ExtArgs> | null;
};
export type RestaurantCountOutputTypeCountCategoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryWhereInput;
};
export type RestaurantCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
export type RestaurantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    imageUrl?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.Restaurant$categoriesArgs<ExtArgs>;
    orders?: boolean | Prisma.Restaurant$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.RestaurantCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurant"]>;
export type RestaurantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    imageUrl?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurant"]>;
export type RestaurantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    imageUrl?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurant"]>;
export type RestaurantSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    imageUrl?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RestaurantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "address" | "imageUrl" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["restaurant"]>;
export type RestaurantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    categories?: boolean | Prisma.Restaurant$categoriesArgs<ExtArgs>;
    orders?: boolean | Prisma.Restaurant$ordersArgs<ExtArgs>;
    _count?: boolean | Prisma.RestaurantCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RestaurantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RestaurantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RestaurantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Restaurant";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        categories: Prisma.$CategoryPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        address: string;
        imageUrl: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["restaurant"]>;
    composites: {};
};
export type RestaurantGetPayload<S extends boolean | null | undefined | RestaurantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RestaurantPayload, S>;
export type RestaurantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RestaurantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RestaurantCountAggregateInputType | true;
};
export interface RestaurantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Restaurant'];
        meta: {
            name: 'Restaurant';
        };
    };
    findUnique<T extends RestaurantFindUniqueArgs>(args: Prisma.SelectSubset<T, RestaurantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RestaurantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RestaurantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RestaurantFindFirstArgs>(args?: Prisma.SelectSubset<T, RestaurantFindFirstArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RestaurantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RestaurantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RestaurantFindManyArgs>(args?: Prisma.SelectSubset<T, RestaurantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RestaurantCreateArgs>(args: Prisma.SelectSubset<T, RestaurantCreateArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RestaurantCreateManyArgs>(args?: Prisma.SelectSubset<T, RestaurantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RestaurantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RestaurantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RestaurantDeleteArgs>(args: Prisma.SelectSubset<T, RestaurantDeleteArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RestaurantUpdateArgs>(args: Prisma.SelectSubset<T, RestaurantUpdateArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RestaurantDeleteManyArgs>(args?: Prisma.SelectSubset<T, RestaurantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RestaurantUpdateManyArgs>(args: Prisma.SelectSubset<T, RestaurantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RestaurantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RestaurantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RestaurantUpsertArgs>(args: Prisma.SelectSubset<T, RestaurantUpsertArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RestaurantCountArgs>(args?: Prisma.Subset<T, RestaurantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RestaurantCountAggregateOutputType> : number>;
    aggregate<T extends RestaurantAggregateArgs>(args: Prisma.Subset<T, RestaurantAggregateArgs>): Prisma.PrismaPromise<GetRestaurantAggregateType<T>>;
    groupBy<T extends RestaurantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RestaurantGroupByArgs['orderBy'];
    } : {
        orderBy?: RestaurantGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RestaurantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RestaurantFieldRefs;
}
export interface Prisma__RestaurantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    categories<T extends Prisma.Restaurant$categoriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Restaurant$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RestaurantFieldRefs {
    readonly id: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly name: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly description: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly address: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly userId: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Restaurant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Restaurant", 'DateTime'>;
}
export type RestaurantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantScalarFieldEnum | Prisma.RestaurantScalarFieldEnum[];
};
export type RestaurantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantScalarFieldEnum | Prisma.RestaurantScalarFieldEnum[];
};
export type RestaurantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantScalarFieldEnum | Prisma.RestaurantScalarFieldEnum[];
};
export type RestaurantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RestaurantCreateInput, Prisma.RestaurantUncheckedCreateInput>;
};
export type RestaurantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RestaurantCreateManyInput | Prisma.RestaurantCreateManyInput[];
};
export type RestaurantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    data: Prisma.RestaurantCreateManyInput | Prisma.RestaurantCreateManyInput[];
    include?: Prisma.RestaurantIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RestaurantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RestaurantUpdateInput, Prisma.RestaurantUncheckedUpdateInput>;
    where: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RestaurantUpdateManyMutationInput, Prisma.RestaurantUncheckedUpdateManyInput>;
    where?: Prisma.RestaurantWhereInput;
    limit?: number;
};
export type RestaurantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RestaurantUpdateManyMutationInput, Prisma.RestaurantUncheckedUpdateManyInput>;
    where?: Prisma.RestaurantWhereInput;
    limit?: number;
    include?: Prisma.RestaurantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RestaurantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateInput, Prisma.RestaurantUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RestaurantUpdateInput, Prisma.RestaurantUncheckedUpdateInput>;
};
export type RestaurantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    where: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantWhereInput;
    limit?: number;
};
export type Restaurant$categoriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput | Prisma.CategoryOrderByWithRelationInput[];
    cursor?: Prisma.CategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CategoryScalarFieldEnum | Prisma.CategoryScalarFieldEnum[];
};
export type Restaurant$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrderSelect<ExtArgs> | null;
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
export type RestaurantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
};

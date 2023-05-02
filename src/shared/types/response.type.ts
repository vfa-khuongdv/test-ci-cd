/**
 * response.type.ts
 * SPL_template
 * Created by khuongdv <khuongdv@vitalify.asia> on 3/16/23
 * Copyright (c) 2023 VFA Asia Co.,Ltd. All rights reserved.
 */

export type CreateResponse = {
  success: boolean;
  message: string;
};

export type UpdateResponse = CreateResponse;
export type DeleteResponse = CreateResponse;

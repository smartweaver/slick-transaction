import { Assignment } from "../../types/Assignment.ts";
import { HTTPResponse } from "../../types/HTTPResponse.ts";
import { Message } from "../../types/Message.ts";
import { kvpToQueryParamsString } from "../../utils/FetchUtils.ts";
import { Scheduler } from "../Scheduler.ts";

export type GetRequestOptions = {
  query: {
    /** The starting date. */
    from?: string;
    /** The ending date. */
    to?: string;
  };
} & RequestInit;

/**
 * @example
 * ```json
 * {
 *   "page_info": {
 *     "has_next_page": true
 *   },
 *   "edges": [
 *     {
 *       "node": {
 *         "message": {
 *           "id": "no734w5WtHMPgS9cyv2u8xSRtRZRUJxThKYu6PAq6oc",
 *           "owner": {
 *             "address": "uhQjEgutJ2Be9IRA-PmFDSIrL8AR2rcEkou4hYwyDw0",
 *             "key": "vXZsOb7KYARNWcdJ1OiumsA5N0e8TgKcWSirPHsNQDJCh_yizwop7tRpCR_lCQfOcEYlBzAzGmZxUpkxdwGG1k6hCmn7e3-5cB4rKAc8h4gaGZfTzHLdqKQwYpPmFsKhwS2QJJWSiynRW-OmhWt-Uo6G5LLzgSb7qBDKgGBgC14uc_-VxMJJ9Imc93O_WE17dSWxmHwXjRPWfuHDMpi1oWldhfq9WksXLV44ucZzjq04Kzbgi_QoCZ-LBCFN7TZ93AenUys5EqbQMeqy5kjuOczjZ_B74xaorgNfesi4s5i9L29ajWxKX_7jDsMm4A7GjHTI36Q_10qOKtBLUYmiMm8oc_UUV-tH2smJo8Sp6nm1vfOsqmesIf2LaMM2_yvzwxXPtTEfFrTSbv_UxCxIjzV0VYnnk3kDG9NekT1cDGkjYpx2oJSet76wydgylCgpWdvEcmhcECSHbqCjA2OsDlnCAvDoinI0DvDIfIfmMUt6GmVh1KlEzH4Q2Es9otcq9duoH1FtAMxE_2ZDABe41fH_mj4U4LS2MDX6pwRz9B-SOiPHTBK8BUdu7O6TDFocT3zrkJ6RU6RGSW1iiGFyLTX_12ZuoSxAyH5bYilc7hA-ydxFP6kehS4FCGgRmBeuKOT4ybQSQ3TAxPadwd4NdIKd7qQnHDKPU-h5W_UrotM"
 *           },
 *           "data": "1984",
 *           "tags": [
 *             {
 *               "name": "Action",
 *               "value": "Eval"
 *             },
 *             {
 *               "name": "Data-Protocol",
 *               "value": "ao"
 *             },
 *             {
 *               "name": "Variant",
 *               "value": "ao.TN.1"
 *             },
 *             {
 *               "name": "Type",
 *               "value": "Message"
 *             },
 *             {
 *               "name": "SDK",
 *               "value": "aoconnect"
 *             }
 *           ],
 *           "signature": "KaF6F2ERruXW0wMd-vwy6leGSypy5cr3694goxc7CbhoiKau3hE5Q7keuwRQS1i4w-AuSY7ew8dXgjfOxSO96zOUUnmcU04IjGwBFCBuM1ypHluIOq-EHbtnHefkOKutlYeSKBY54p8xGSqhZfE2-_FVUZ6-pJBMR_ZeLSEsJALqKS35p0OQXNpa1hMKhFLgbQUiL9j71U-xnvinoYTWz96HvZdNY-Bb4VoPdRHuep_1yk8xCZof9GH9xYyjk_FQFTyn9lJu6NjpQ3AvO_1qGsEWzr_MtP2IO6J8tS183P5wSy1Uuf7JJOF-PyJlcUk3gNgYiMMAppSOLnjVqYbUyqyqoPWYlqBn7Fxoi3dpKtLIW21R_ik6HAsdEoW9vJnorvlSp8uhLOP8J11fKBbcayNWrUDFuFX-xS8JSbrcc73zdnn-sFYBAdJtkohJiWErAKXqp36IX-h1FJY0TKB10QR0rmzMzjNVnLbFxJ_dlSQq_IHDCkG78jbNlazXmqNAfx2-x1fXylMp9d41Slexcgm4pPSfXKjqZriQm3LL6p-gYAVPcpPQFF9Ai1QB4N8FNKrIzCyGodtAWb4gHf38houjzieVRw2hRf4fvLI98P1Uzysd0dWq7C0Jk9wel8C4rKVyGclpWkunYhyjUvQSkwdoRMIAHap0ukg8wHQLFXc",
 *           "anchor": null,
 *           "target": "0HESttvcBa1KXy4aicLURBK6ts4E_Eu4iqAsyYnlOLA"
 *         },
 *         "assignment": {
 *           "id": "9O5_GXabuCuFhyaJ_F8V9YYe6-Xsn4cEBcvcS66Sbng",
 *           "owner": {
 *             "address": "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY",
 *             "key": "kePMooMn7uEakQJCE_4DtzcJUPs6x6d-9nG6Pjg84qJqYM9G7-eIg7Enrg-OEqGTjIoreE7tnTB5z66TqQnllSJa8QNDqHbdN1efAs9RknriT62W7Cyqoz_ErjVhc7Wfx02oQm-SpaUSdo1k8orAJ94ADmw_SbCbceCNirStjcNGJ7x1FSj9iNViETvgEmTICYIlyud8C-FU7oLYjEnlAIwUggrP87uEKyp4a1OLDosxGymIZ7F2yue2d1Y0VXl2vhUOvYrvBvAbPUzuOV0x1sajSz33w9uMdZJceOQbxdj3tgWECvzdNTVincyH8wME1-24Wdqki26SEWqvsjTyjpOctT5MC3riEemjv2KXncXf6-vzPGIdl34MbOu5HkmaxBnUrPsm6xPv6JgbthqJCVbvqQ0dFqqHKARU0g5vYpyAXKjjBJvWjKvUHoK_2hSkpLFaf_GHy3ap1MnYELazK5-Rt7yO1Wq6lPfgPRkROOWP0nCZCcDFpyIrA7Wr_BuZ-pzMHquBYV5i3pCWCuFtanTVlVC7EmPSEMIPCBwIVgBeLVMgAoPgwWB3RqD7JvjMcGvDCONflVRf6NoJjXwuzU8ZBp33cqc-XWAVhrAcd0AGt1N0-7riZSmvEWhpjNrc90ODe01gj55dj5LUFvTO0nmHeyVSMsAKmChacU3-C50"
 *           },
 *           "tags": [
 *             {
 *               "name": "Process",
 *               "value": "0HESttvcBa1KXy4aicLURBK6ts4E_Eu4iqAsyYnlOLA"
 *             },
 *             {
 *               "name": "Message",
 *               "value": "no734w5WtHMPgS9cyv2u8xSRtRZRUJxThKYu6PAq6oc"
 *             },
 *             {
 *               "name": "Epoch",
 *               "value": "0"
 *             },
 *             {
 *               "name": "Nonce",
 *               "value": "0"
 *             },
 *             {
 *               "name": "Hash-Chain",
 *               "value": "lJq2vqkAFNUbCkmZzGJvSNRhYbK5DfkB-mxn4ox0kFg"
 *             },
 *             {
 *               "name": "Block-Height",
 *               "value": "000001402984"
 *             },
 *             {
 *               "name": "Timestamp",
 *               "value": "1712967091755"
 *             }
 *           ],
 *           "signature": "HPPrw_h3BkWiluEEeFwBvEuoOSDgFaKvXHXAIwyhxD9NRZ0dbja6kT6iOzEaO-6b6Haiwu3Yjffj-iZ4BSAROCRLCp7AC9BaNAZfKsu6SqJjGXgoAeyJXZ72_bpblRIQT00iJSMevwH1HPg7BY14Lk4IdBRIcN4oEoxrya6zazMjdIPb44p-a89qh3HuusYymhPucvGiVr0Et4mye7B_UYI_o0HZVjrYgsJRyzj2IFfwnw1ohqQarmvly8AzHCLK30spZSq_cbnXvrYlEhIa2MkFYB_XsPcW7ABLUZXZj9RKvykzAyzLadAjzK-pbXojQWyX1O3a9PUKji9fbjUgKXnDwBTNT2mneCf-Ch2fnCibpLd4lHJWyo4fybgYrdxKlveUr29dlLWtFhsnCzZevcs5hzm5KUb4WE8c-YWH111iYCLzj-cTpeWEWi2Vs6HweAQNNZr12D9suXS9rKRdPWUZI3aXZNmc1x-r6TZ3WwFKYm3nPXuxokltAf5Vk_bTVRKUB3pWCnO39HLEqpFUWgTnCCkMFJHA9qOzSHh1QjbAGyN3LZgd5d0W3BayOcRfNMGHN5qqojdRXwyp7cu2xfJPAg9rfS0gMUCKbgKWSpRoEns9ELOI-ekG-V5fTga4DQyn54auXvx9yJiRbKfvLPJYtouNOL22Q9OimT5OlmI",
 *           "anchor": null,
 *           "target": ""
 *         }
 *       },
 *       "cursor": "1712967091755"
 *     }
 *   ]
 * }
 * ```
 */
export type GetProcessResponse = HTTPResponse.PaginatedResponse<{
  message: Message;
  assignment: Assignment;
}>;

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{su-url}/{process-id}`
 *
 * Methods within this class provide HTTP-like APIs.
 */
export class Process {
  protected process_id: string;
  protected scheduler_unit: Scheduler;

  constructor(schedulerUnit: Scheduler, processId: string) {
    this.scheduler_unit = schedulerUnit;

    if (!processId) {
      throw new Error(`Cannot fetch process without Process ID`);
    }

    this.process_id = processId;
  }

  /**
   * Make the following request(s):
   * ```text
   *     GET {su-url}/{process-id}
   *     GET {su-url}/{process-id}?from=1715039710324&to=1715039720324
   * ````
   * @param options (Optional) Options to pass to the request.
   *
   * @example
   * ```ts
   * // Get all messages
   * const res = await new SchedulerUnit()
   *   .process("1557")
   *   .get();
   *
   * // Get messages from the given "from" date to the given "to" date
   * const res = await new SchedulerUnit()
   *   .process("1557")
   *   .get({ query: { from: "1715039710324", to: "1715039720324" } })
   *
   * // - end of example -
   * ```
   */
  get(options: GetRequestOptions): Promise<GetProcessResponse> {
    const queryString = kvpToQueryParamsString(options?.query);

    return this.scheduler_unit
      .fetch(`/${this.process_id}${queryString}`)
      .then((res) => res.json());
  }
}

import { Tag } from "../../../types/Tag.ts";
import { Scheduler } from "../../Scheduler.ts";

/**
 * @example
 * ```
 * {
 *   "process_id": "0HESttvcBa1KXy4aicLURBK6ts4E_Eu4iqAsyYnlOLA",
 *   "block": "000001402984",
 *   "owner": {
 *     "address": "uhQjEgutJ2Be9IRA-PmFDSIrL8AR2rcEkou4hYwyDw0",
 *     "key": "vXZsOb7KYARNWcdJ1OiumsA5N0e8TgKcWSirPHsNQDJCh_yizwop7tRpCR_lCQfOcEYlBzAzGmZxUpkxdwGG1k6hCmn7e3-5cB4rKAc8h4gaGZfTzHLdqKQwYpPmFsKhwS2QJJWSiynRW-OmhWt-Uo6G5LLzgSb7qBDKgGBgC14uc_-VxMJJ9Imc93O_WE17dSWxmHwXjRPWfuHDMpi1oWldhfq9WksXLV44ucZzjq04Kzbgi_QoCZ-LBCFN7TZ93AenUys5EqbQMeqy5kjuOczjZ_B74xaorgNfesi4s5i9L29ajWxKX_7jDsMm4A7GjHTI36Q_10qOKtBLUYmiMm8oc_UUV-tH2smJo8Sp6nm1vfOsqmesIf2LaMM2_yvzwxXPtTEfFrTSbv_UxCxIjzV0VYnnk3kDG9NekT1cDGkjYpx2oJSet76wydgylCgpWdvEcmhcECSHbqCjA2OsDlnCAvDoinI0DvDIfIfmMUt6GmVh1KlEzH4Q2Es9otcq9duoH1FtAMxE_2ZDABe41fH_mj4U4LS2MDX6pwRz9B-SOiPHTBK8BUdu7O6TDFocT3zrkJ6RU6RGSW1iiGFyLTX_12ZuoSxAyH5bYilc7hA-ydxFP6kehS4FCGgRmBeuKOT4ybQSQ3TAxPadwd4NdIKd7qQnHDKPU-h5W_UrotM"
 *   },
 *   "tags": [
 *     {
 *       "name": "App-Name",
 *       "value": "aos"
 *     },
 *     {
 *       "name": "Name",
 *       "value": "ap-testnet-phw-001"
 *     },
 *     {
 *       "name": "aos-Version",
 *       "value": "1.10.25"
 *     },
 *     {
 *       "name": "Data-Protocol",
 *       "value": "ao"
 *     },
 *     {
 *       "name": "Variant",
 *       "value": "ao.TN.1"
 *     },
 *     {
 *       "name": "Type",
 *       "value": "Process"
 *     },
 *     {
 *       "name": "Module",
 *       "value": "1PdCJiXhNafpJbvC-sjxWTeNzbf9Q_RfUNs84GYoPm0"
 *     },
 *     {
 *       "name": "Scheduler",
 *       "value": "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA"
 *     },
 *     {
 *       "name": "SDK",
 *       "value": "aoconnect"
 *     }
 *   ],
 *   "timestamp": 1712967090448,
 *   "data": "1984",
 *   "anchor": null,
 *   "signature": "keLwjXId6AFv2IhQ049kNAmwHP_iFMO_-qfLAz5VIzdKp4lG3bmmk4wE1XzqhnLvjcMBQZnCUZql6LNG9CTZZYUQN3ff1P_KE8EgHRUDtA-LYtgDmqmIcrG5Kqj4QuTy10CFM3Lt9Z28X9nCiqPZNxzGCGlurMLlCQoDfLbfCWHYMCSpl2P7ek5KKsAx_55jdv3DIVVo245a5TPJD_d2dEIdeWo2wpkVUSZYGy4wnMP3Hegtd6Z5BFat98owQ6E76TA1QesEk7Hsz_nhOZaX4Jd9CPBhX4BRssCnOCL1L0PWWHIsutImLOLV8IqsjeGSkCdnjFBfW2zil1pIxF0xIwD4NgV-_f9P4sCQ6Hi5EztCkRlY6ICmE958BtVi4iZCdaKE-9pQiygBNOBxYEzpJIyCs1t3E-Fp1UNjBIfhEuOM50qQFlAwU4zv6_tH7V37tRxh4sd8z7TU_AwrKe4iYrF0DesyjFVR__RflaCMBqPGdbzKDi8DRB_dtdt9HEUPrpmJiJM1r4-Z3OsrtdnxcGsK5DzGGayA4NlOq1xvymIiYshgMYn3YMotTLDAxEyRSNikJFfjBy_q8X8Gy4A_abpMhl74eOgb4N-AMWgB0jXWnZWISIefeGLfAEBsIdXZW6zDKpq0les4pTeMAMb_SsI-_Tku-0IwS179-GOn9Zk"
 * }
 * ```
 */
export type SchedulerUnitProcess = {
  process_id: string;
  block: string;
  owner: { address: string; key: string };
  tags: Tag[];
  timestamp: number;
  data: string;
  anchor: null | string;
  signature: string;
};

/**
 * This class is responsible for interacting with the following endpoints:
 *
 * - `{su-url}/processes/{process-id}`
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
   *     GET {su-url}/processes/{process-id}
   * ````
   * @returns The result of the request.
   *
   * @example
   * ```ts
   * const res = await new SchedulerUnit()
   *   .processes()
   *   .process("1557")
   *   .get();
   *
   * // - end of example -
   * ```
   */
  get(): Promise<SchedulerUnitProcess> {
    return this.scheduler_unit
      .fetch(`/processes/${this.process_id}`)
      .then((res) => res.json());
  }
}

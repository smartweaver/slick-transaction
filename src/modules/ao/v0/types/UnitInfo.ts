export type UnitInfo = {
  /**
   * The wallet address that manages this Unit. The address can be used to
   * query block explorers. For example, the following link queries the
   * aolink block explorer for the address:
   *
   * https://www.ao.link/#/entity/fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY
   */
  address: string;

  /**
   * The current timestamp of the Compute Unit.
   */
  timestamp: string;
};

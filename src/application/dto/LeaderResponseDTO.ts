export class LeaderResponseDTO {
  public constructor(private leaderId: string, private specialtyId: string) { }

  public toObject(): { leaderId: string; specialtyId: string; message: string; } {
    return {
      leaderId: this.leaderId,
      specialtyId: this.specialtyId,
      message: 'leader registered successfully'
    };
  }
};

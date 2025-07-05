export class EnrollResponseDTO {
  public constructor(private enrollmentId: string) { }

  public toObject(): { enrollmentId: string; message: string; } {
    return {
      enrollmentId: this.enrollmentId,
      message: 'project create successfully'
    };
  };
};

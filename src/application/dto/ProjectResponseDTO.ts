export class ProjectResponseDTO {
  public constructor(private projectId: string) { }

  public toObject(): { projectId: string; message: string; } {
    return {
      projectId: this.projectId,
      message: 'project create successfully',
    };
  }
}

import { EmailSender } from "../../application/observers/EmailSender";
import { LeaderCreatorUseCase } from "../../application/usecase/LeaderCreatorUseCase";
import { ProjectBasedAdvisorFinderUseCase } from "../../application/usecase/ProjectBasedAdvisorFinderUseCase";
import { ProjectCreatorUseCase } from "../../application/usecase/ProjectCreatorUseCase";
import { StudentEnrollerInProjectUseCase } from "../../application/usecase/StudentEnrollerInProjectUseCase";
import { NotificationPublisher } from "../../domain/events/NotificationPublisher";
import { HttpController } from "../../domain/interfaces/HttpController";
import { IdGenerator } from "../../domain/interfaces/IdGenerator";
import { SpecialtyExistenceFinder } from "../../domain/interfaces/SpecialtyExistenceFinder";
import { EnsureStudentExistsForEnrollmentServices } from "../../domain/services/EnsureStudentExistsForEnrollmentServices";
import { QualifiedLeaderFinderServices } from "../../domain/services/QualifiedLeaderFinderServices";
import { ResolveProjectForEnrollmentServices } from "../../domain/services/ResolveProjectForEnrollmentServices";
import { SchedulingDateTimeValidatorServices } from "../../domain/services/SchedulingDateTimeValidatorServices";
import { ValidatedLeaderCreatorServices } from "../../domain/services/ValidatedLeaderCreatorServices";
import { ValidateEnrollmentCreatorServices } from "../../domain/services/ValidateEnrollmentCreatorServices";
import { EjsTemplateRenderer } from "../../infrastructure/email/EjsTemplateRenderer";
import { NodeMailerEmailNotification } from "../../infrastructure/email/NodeMailerEmailNotification";
import { UUID } from "../../infrastructure/idgenerator/UUID";
import { PrimaSpecialtyExistenceFinder } from "../../infrastructure/repository/PrimaSpecialtyExistenceFinder";
import { PrismaAdvisorSpecializationCreator } from "../../infrastructure/repository/PrismaAdvisorSpecializationCreator";
import { PrismaLeaderCreator } from "../../infrastructure/repository/PrismaLeaderCreator";
import { PrismaLeaderFinder } from "../../infrastructure/repository/PrismaLeaderFinder";
import { PrismaProjectBasedAdvisorFinder } from "../../infrastructure/repository/PrismaProjectBasedAdvisorFinder";
import { PrismaProjectCreator } from "../../infrastructure/repository/PrismaProjectCreator";
import { PrismaProjectFinderByName } from "../../infrastructure/repository/PrismaProjectFinderByName";
import { PrismaSpecialistAdvisorFinder } from "../../infrastructure/repository/PrismaSpecialistAdvisorFinder";
import { PrismaStudentCreator } from "../../infrastructure/repository/PrismaStudentCreator";
import { PrismaStudentEnrollerInProject } from "../../infrastructure/repository/PrismaStudentEnrollerInProject";
import { PrismaStudentFinder } from "../../infrastructure/repository/PrismaStudentFinder";
import { LeaderCreatorControllers } from "../../presentation/controllers/LeaderCreatorControllers";
import { ProjectBasedAdvisorFinderControllers } from "../../presentation/controllers/ProjectBasedAdvisorFinderControllers";
import { ProjectCreatorControllers } from "../../presentation/controllers/ProjectCreatorControllers";
import { StudentEnrollerInProjectControllers } from "../../presentation/controllers/StudentEnrollerInProjectControllers";


export class Container {
    private static instance: Container;

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    private buildLeaderController(
        idGenerator: IdGenerator,
        specialtyExistenceFinder: SpecialtyExistenceFinder
    ): HttpController {
        const leaderCreator = new PrismaLeaderCreator();
        const leaderFinder = new PrismaLeaderFinder();
        const advisorSpecializationCreator = new PrismaAdvisorSpecializationCreator();

        const validatedLeaderCreatorServices = new ValidatedLeaderCreatorServices(
            idGenerator,
            specialtyExistenceFinder
        );

        const leaderCreatorUseCase = new LeaderCreatorUseCase(
            leaderCreator,
            leaderFinder,
            advisorSpecializationCreator,
            validatedLeaderCreatorServices
        );

        return new LeaderCreatorControllers(leaderCreatorUseCase);
    }

    private buildProjectBasedAdvisorController(): HttpController {
        const projectBasedAdvisorFinder = new PrismaProjectBasedAdvisorFinder();
        const projectBasedAdvisorFinderUseCase = new ProjectBasedAdvisorFinderUseCase(projectBasedAdvisorFinder);
        return new ProjectBasedAdvisorFinderControllers(projectBasedAdvisorFinderUseCase);
    }

    private buildProjectCreatorController(idGenerator: IdGenerator): HttpController {
        const projectCreator = new PrismaProjectCreator();
        const projectCreatorUseCase = new ProjectCreatorUseCase(idGenerator, projectCreator);
        return new ProjectCreatorControllers(projectCreatorUseCase);
    }

    private buildStudentEnrollerController(
        idGenerator: IdGenerator,
        specialtyExistenceFinder: SpecialtyExistenceFinder,
        notificationPublisher: NotificationPublisher
    ): HttpController {
        const studentEnroller = new PrismaStudentEnrollerInProject();
        const studentCreator = new PrismaStudentCreator();
        const studentFinder = new PrismaStudentFinder();

        const ensureStudentExists = new EnsureStudentExistsForEnrollmentServices(
            studentCreator,
            studentFinder,
            idGenerator
        );

        const resolveProject = new ResolveProjectForEnrollmentServices(specialtyExistenceFinder);
        const specialistFinder = new PrismaSpecialistAdvisorFinder();
        const qualifiedLeaderFinder = new QualifiedLeaderFinderServices(specialistFinder);

        const validateEnrollment = new ValidateEnrollmentCreatorServices(
            ensureStudentExists,
            resolveProject,
            qualifiedLeaderFinder,
            idGenerator
        );

        const projectFinderByName = new PrismaProjectFinderByName();
        const dateTimeValidator = new SchedulingDateTimeValidatorServices(idGenerator, projectFinderByName);

        const studentEnrollerInProjectUseCase = new StudentEnrollerInProjectUseCase(
            studentEnroller,
            validateEnrollment,
            dateTimeValidator,
            notificationPublisher
        );

        return new StudentEnrollerInProjectControllers(studentEnrollerInProjectUseCase);
    }

    private buildNotificationPublisher(): NotificationPublisher {
        const publisher = new NotificationPublisher();
        publisher.register(new EmailSender(new NodeMailerEmailNotification(), new EjsTemplateRenderer()));
        return publisher;
    }

    public dependencies() {
        const idGenerator = new UUID();
        const specialtyExistenceFinder = new PrimaSpecialtyExistenceFinder();
        const notificationPublisher = this.buildNotificationPublisher();

        return {
            leaderCreatorControllers: this.buildLeaderController(idGenerator, specialtyExistenceFinder),
            projectBasedAdvisorFinderControllers: this.buildProjectBasedAdvisorController(),
            projectCreatorControllers: this.buildProjectCreatorController(idGenerator),
            studentEnrollerInProjectControllers: this.buildStudentEnrollerController(idGenerator, specialtyExistenceFinder, notificationPublisher),
        };
    }
}

import {
    LeaderCreatorUseCase,
    ProjectBasedAdvisorFinderUseCase,
    ProjectCreatorUseCase,
    StudentEnrollerInProjectUseCase,
} from '../../application';

import {
    ValidatedLeaderCreatorServices,
    EnsureStudentExistsForEnrollmentServices,
    ResolveProjectForEnrollmentServices,
    QualifiedLeaderFinderServices,
    ValidateEnrollmentCreatorServices,
    SchedulingDateTimeValidatorServices,
    NotificationPublisher,
    IdGenerator,
    SpecialtyExistenceFinder,
    HttpController,
} from '../../domain';

import {
    PrismaLeaderCreator,
    PrismaLeaderFinder,
    PrismaAdvisorSpecializationCreator,
    PrismaProjectBasedAdvisorFinder,
    PrismaProjectCreator,
    PrismaStudentEnrollerInProject,
    PrismaStudentCreator,
    PrismaStudentFinder,
    PrismaSpecialistAdvisorFinder,
    PrismaProjectFinderByName,
    PrimaSpecialtyExistenceFinder,
    UUID,
    EmailNotification,
} from '../../infrastructure';

import {
    LeaderCreatorControllers,
    ProjectBasedAdvisorFinderControllers,
    ProjectCreatorControllers,
    StudentEnrollerInProjectControllers,
} from '../../presentation';

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
        publisher.register(new EmailNotification());
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

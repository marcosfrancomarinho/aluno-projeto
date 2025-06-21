import * as A from '../../application';
import * as D from "../../domain";
import * as I from "../../infrastructure";
import * as P from "../../presentation";

export class Container {
    private static instance: Container;

    public static getInstance(): Container {
        if (!Container.instance) {
            Container.instance = new Container();
        }
        return Container.instance;
    }

    private buildLeaderController(
        idGeneretor: D.IdGenerator,
        specialtyExistenceFinder: D.SpecialtyExistenceFinder
    ): D.HttpController {
        const leaderCreator = new I.PrismaLeaderCreator();
        const leaderFinder = new I.PrismaLeaderFinder();
        const advisorSpecializationCreator = new I.PrismaAdvisorSpecializationCreator();

        const validatedLeaderCreatorServices = new D.ValidatedLeaderCreatorServices(
            idGeneretor,
            specialtyExistenceFinder
        );

        const leaderCreatorUseCase = new A.LeaderCreatorUseCase(
            leaderCreator,
            leaderFinder,
            advisorSpecializationCreator,
            validatedLeaderCreatorServices
        );

        return new P.LeaderCreatorControllers(leaderCreatorUseCase);
    }

    private buildProjectBasedAdvisorController(): D.HttpController {
        const projectBasedAdvisorFinder = new I.PrismaProjectBasedAdvisorFinder();
        const projectBasedAdvisorFinderUseCase = new A.ProjectBasedAdvisorFinderUseCase(
            projectBasedAdvisorFinder
        );

        return new P.ProjectBasedAdvisorFinderControllers(projectBasedAdvisorFinderUseCase);
    }

    private buildProjectCreatorController(idGeneretor: D.IdGenerator): D.HttpController {
        const projectCreator = new I.PrismaProjectCreator();
        const projectCreatorUseCase = new A.ProjectCreatorUseCase(idGeneretor, projectCreator);

        return new P.ProjectCreatorControllers(projectCreatorUseCase);
    }

    private buildStudentEnrollerController(
        idGeneretor: D.IdGenerator,
        specialtyExistenceFinder: D.SpecialtyExistenceFinder,
        notificationPublisher: D.NotificationPublisher
    ): D.HttpController {
        const studentEnrollerInProject = new I.PrismaStudentEnrollerInProject();
        const studentCreator = new I.PrismaStudentCreator();
        const studentFinder = new I.PrismaStudentFinder();

        const ensureStudentExists = new D.EnsureStudentExistsForEnrollmentServices(
            studentCreator,
            studentFinder,
            idGeneretor
        );

        const resolveProject = new D.ResolveProjectForEnrollmentServices(specialtyExistenceFinder);
        const specialistFinder = new I.PrismaSpecialistAdvisorFinder();
        const qualifiedLeaderFinder = new D.QualifiedLeaderFinderServices(specialistFinder);

        const validateEnrollment = new D.ValidateEnrollmentCreatorServices(
            ensureStudentExists,
            resolveProject,
            qualifiedLeaderFinder,
            idGeneretor
        );

        const projectFinderByName = new I.PrismaProjectFinderByName();
        const dateTimeValidator = new D.SchedulingDateTimeValidatorServices(idGeneretor, projectFinderByName);

        const studentEnrollerUseCase = new A.StudentEnrollerInProjectUseCase(
            studentEnrollerInProject,
            validateEnrollment,
            dateTimeValidator,
            notificationPublisher
        );

        return new P.StudentEnrollerInProjectControllers(studentEnrollerUseCase);
    }
    private buildNotificationPublisher(): D.NotificationPublisher {
        const publisher = new D.NotificationPublisher();
        publisher.register(new I.EmailNotification());
        return publisher;
    }

    public dependencies() {
        const idGeneretor = new I.UUID();
        const specialtyExistenceFinder = new I.PrimaSpecialtyExistenceFinder();
        const notificationPublisher = this.buildNotificationPublisher();

        return {
            leaderCreatorControllers: this.buildLeaderController(idGeneretor, specialtyExistenceFinder),
            projectBasedAdvisorFinderControllers: this.buildProjectBasedAdvisorController(),
            projectCreatorControllers: this.buildProjectCreatorController(idGeneretor),
            studentEnrollerInProjectControllers: this.buildStudentEnrollerController(idGeneretor, specialtyExistenceFinder, notificationPublisher),
        };
    }
}

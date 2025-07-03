import { EmailSender } from '../../application/listeners/EmailSender';
import { AllProjectFinderUseCase } from '../../application/usecase/AllProjectFinderUseCase';
import { LeaderCreatorUseCase } from '../../application/usecase/LeaderCreatorUseCase';
import { LoginUserUseCase } from '../../application/usecase/LoginUserUseCase';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/ProjectBasedAdvisorFinderUseCase';
import { ProjectCreatorUseCase } from '../../application/usecase/ProjectCreatorUseCase';
import { SignUpUserUseCase } from '../../application/usecase/SignUpUserUseCase';
import { StudentEnrollerInProjectUseCase } from '../../application/usecase/StudentEnrollerInProjectUseCase';
import { NotificationPublisher } from '../../domain/events/NotificationPublisher';
import { HttpControllers } from '../../domain/interfaces/HttpController';
import { IdGenerator } from '../../domain/interfaces/IdGenerator';
import { PasswordEncryptor } from '../../domain/interfaces/PasswordEncryptor';
import { SpecialtyExistenceFinder } from '../../domain/interfaces/SpecialtyExistenceFinder';
import { EnsureStudentExistsForEnrollmentServices } from '../../domain/services/EnsureStudentExistsForEnrollmentServices';
import { QualifiedLeaderFinderServices } from '../../domain/services/QualifiedLeaderFinderServices';
import { ResolveProjectForEnrollmentServices } from '../../domain/services/ResolveProjectForEnrollmentServices';
import { SchedulingDateTimeValidatorServices } from '../../domain/services/SchedulingDateTimeValidatorServices';
import { ValidatedLeaderCreatorServices } from '../../domain/services/ValidatedLeaderCreatorServices';
import { ValidateEnrollmentCreatorServices } from '../../domain/services/ValidateEnrollmentCreatorServices';
import { VerifyUserCredentialsServices } from '../../domain/services/VerifyUserCredentialsServices';
import { JwtUserAuthenticator } from '../../infrastructure/auth/JwtUserAuthenticator';
import { EjsTemplateRenderer } from '../../infrastructure/email/EjsTemplateRenderer';
import { NodeMailerEmailNotification } from '../../infrastructure/email/NodeMailerEmailNotification';
import { BcryptPasswordEncryptor } from '../../infrastructure/encryptor/BcryptPasswordEncryptor';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { PrimaSpecialtyExistenceFinder } from '../../infrastructure/repository/PrimaSpecialtyExistenceFinder';
import { PrismaAdvisorSpecializationCreator } from '../../infrastructure/repository/PrismaAdvisorSpecializationCreator';
import { PrismaAllProjectFinder } from '../../infrastructure/repository/PrismaAllProjectFinder';
import { PrismaLeaderCreator } from '../../infrastructure/repository/PrismaLeaderCreator';
import { PrismaLeaderFinder } from '../../infrastructure/repository/PrismaLeaderFinder';
import { PrismaLoginUser } from '../../infrastructure/repository/PrismaLoginUser';
import { PrismaProjectBasedAdvisorFinder } from '../../infrastructure/repository/PrismaProjectBasedAdvisorFinder';
import { PrismaProjectCreator } from '../../infrastructure/repository/PrismaProjectCreator';
import { PrismaProjectFinderByName } from '../../infrastructure/repository/PrismaProjectFinderByName';
import { PrismaSignUpUser } from '../../infrastructure/repository/PrismaSignUpUser';
import { PrismaSpecialistAdvisorFinder } from '../../infrastructure/repository/PrismaSpecialistAdvisorFinder';
import { PrismaStudentCreator } from '../../infrastructure/repository/PrismaStudentCreator';
import { PrismaStudentEnrollerInProject } from '../../infrastructure/repository/PrismaStudentEnrollerInProject';
import { PrismaStudentFinder } from '../../infrastructure/repository/PrismaStudentFinder';
import { AllProjectFinderControllers } from '../../presentation/controllers/AllProjectFinderControllers';
import { LeaderCreatorControllers } from '../../presentation/controllers/LeaderCreatorControllers';
import { LoginUserControllers } from '../../presentation/controllers/LoginUserControllers';
import { ProjectBasedAdvisorFinderControllers } from '../../presentation/controllers/ProjectBasedAdvisorFinderControllers';
import { ProjectCreatorControllers } from '../../presentation/controllers/ProjectCreatorControllers';
import { SignUpUserControllers } from '../../presentation/controllers/SignUpUserControllers';
import { StudentEnrollerInProjectControllers } from '../../presentation/controllers/StudentEnrollerInProjectControllers';
import { UserAuthenticatorMiddlewares } from '../../presentation/middlewares/UserAuthenticatorMiddlewares';

export class Container {
  private static instance: Container;

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private buildLeaderController(idGenerator: IdGenerator, specialtyExistenceFinder: SpecialtyExistenceFinder): HttpControllers {
    const leaderCreator = new PrismaLeaderCreator();
    const leaderFinder = new PrismaLeaderFinder();
    const advisorSpecializationCreator = new PrismaAdvisorSpecializationCreator();

    const validatedLeaderCreatorServices = new ValidatedLeaderCreatorServices(idGenerator, specialtyExistenceFinder);

    const leaderCreatorUseCase = new LeaderCreatorUseCase(
      leaderCreator,
      leaderFinder,
      advisorSpecializationCreator,
      validatedLeaderCreatorServices
    );

    return new LeaderCreatorControllers(leaderCreatorUseCase);
  }

  private buildProjectBasedAdvisorController(): HttpControllers {
    const projectBasedAdvisorFinder = new PrismaProjectBasedAdvisorFinder();
    const projectBasedAdvisorFinderUseCase = new ProjectBasedAdvisorFinderUseCase(projectBasedAdvisorFinder);
    return new ProjectBasedAdvisorFinderControllers(projectBasedAdvisorFinderUseCase);
  }

  private buildProjectCreatorController(idGenerator: IdGenerator): HttpControllers {
    const projectCreator = new PrismaProjectCreator();
    const projectCreatorUseCase = new ProjectCreatorUseCase(idGenerator, projectCreator);
    return new ProjectCreatorControllers(projectCreatorUseCase);
  }

  private buildStudentEnrollerController(
    idGenerator: IdGenerator,
    specialtyExistenceFinder: SpecialtyExistenceFinder,
    notificationPublisher: NotificationPublisher
  ): HttpControllers {
    const studentEnroller = new PrismaStudentEnrollerInProject();
    const studentCreator = new PrismaStudentCreator();
    const studentFinder = new PrismaStudentFinder();

    const ensureStudentExists = new EnsureStudentExistsForEnrollmentServices(studentCreator, studentFinder, idGenerator);

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
  private buildAllProjectFinderController(): HttpControllers {
    const allProjectFinderAll = new PrismaAllProjectFinder();
    const allProjectFinderAllUseCase = new AllProjectFinderUseCase(allProjectFinderAll);
    const allProjectFinderControllers = new AllProjectFinderControllers(allProjectFinderAllUseCase);
    return allProjectFinderControllers;
  }
  private buildSignUpUserController(idGenerator: IdGenerator, passwordEncyptor: PasswordEncryptor): HttpControllers {
    const signUpUser = new PrismaSignUpUser();

    const signUpUserUseCase = new SignUpUserUseCase(signUpUser, idGenerator, passwordEncyptor);
    const signUpUserControllers = new SignUpUserControllers(signUpUserUseCase);
    return signUpUserControllers;
  }
  private buildLoginUserControllers(passwordEncyptor: PasswordEncryptor, userAuthenticator: JwtUserAuthenticator) {
    const loginUser = new PrismaLoginUser();
    const verifyUserCredentialsServices = new VerifyUserCredentialsServices(passwordEncyptor);
    const loginUserUseCase = new LoginUserUseCase(loginUser, userAuthenticator, verifyUserCredentialsServices);
    const loginUserControllers = new LoginUserControllers(loginUserUseCase);
    return loginUserControllers;
  }
  private buildUserAuthenticatorMiddlewares() {
    const jwtUserAuthenticator = new JwtUserAuthenticator();
    const userAuthenticatorMiddlewares = new UserAuthenticatorMiddlewares(jwtUserAuthenticator);
    return userAuthenticatorMiddlewares;
  }

  public dependencies() {
    const idGenerator = new UUID();
    const passwordEncyptor = new BcryptPasswordEncryptor();
    const specialtyExistenceFinder = new PrimaSpecialtyExistenceFinder();
    const notificationPublisher = this.buildNotificationPublisher();
    const userAuthenticator = new JwtUserAuthenticator();

    return {
      leaderCreatorControllers: this.buildLeaderController(idGenerator, specialtyExistenceFinder),
      projectBasedAdvisorFinderControllers: this.buildProjectBasedAdvisorController(),
      projectCreatorControllers: this.buildProjectCreatorController(idGenerator),
      allProjectFinderControllers: this.buildAllProjectFinderController(),
      signUpUserControllers: this.buildSignUpUserController(idGenerator, passwordEncyptor),
      loginUserControllers: this.buildLoginUserControllers(passwordEncyptor, userAuthenticator),
      userAuthenticatorMiddlewares: this.buildUserAuthenticatorMiddlewares(),
      studentEnrollerInProjectControllers: this.buildStudentEnrollerController(
        idGenerator,
        specialtyExistenceFinder,
        notificationPublisher
      ),
    };
  }
}

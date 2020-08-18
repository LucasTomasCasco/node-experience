import { lazyInject } from '../../../inversify.config'
import ChangeUserPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";

class ChangeUserPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.id();
        const user: IUserDomain = await this.repository.getOne(id);

        user.password = await this.encryption.encrypt(payload.newPassword());

        await this.repository.save(user);

        return user;
    }
}

export default ChangeUserPasswordUseCase;

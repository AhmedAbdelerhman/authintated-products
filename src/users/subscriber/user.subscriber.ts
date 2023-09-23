import { OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    LoadEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEintity } from '../entities/user.entity';
@EventSubscriber()
export class UserSubscriber
    implements EntitySubscriberInterface, OnModuleInit {

    constructor(dataSource: DataSource, private moduleRef: ModuleRef) {
        dataSource.subscribers.push(this);
    }

    // inject service outsite dependency injection
    async onModuleInit() { }

    listenTo() {
        return UserEintity;
    }


    async beforeInsert(event: InsertEvent<UserEintity>): Promise<any> {
        const user = event.entity;
        const saltRounds = 10; // Adjust the number of salt rounds as needed for your security requirements

        if (user.password) {
            const hashedPassword = await bcrypt.hash(user.password, saltRounds);
            user.password = hashedPassword;
        }
    }

    afterInsert(event: InsertEvent<UserEintity>) {
        // Your logic here
        console.log('Entity inserted:', event.entity);
    }
}

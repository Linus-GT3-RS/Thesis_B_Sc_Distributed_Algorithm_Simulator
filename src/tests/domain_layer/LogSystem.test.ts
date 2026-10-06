import { IndexedStore } from '@/common/EntityStores';
import { LogType, ProcessLogState } from '@/domain_layer/components/algorithm_plugins/plugin_api/entities/state_entities/Logs';
import { LoggingSystem } from '@/domain_layer/components/simulation/engine/environment_systems/LogSystem';
import { test, expect, vi } from 'vitest'

test("LogSystem handles logging of type info", () => {

    //? arrange
    //* Mock Store
    const MockedStore = vi.fn(IndexedStore<ProcessLogState>);
    MockedStore.prototype.insert = vi.fn();
    MockedStore.prototype.size = vi.fn(() => 3);

    //* Mock Observer
    const MockedObserver = {
        notifyChange: vi.fn()
    } 
    
    //* Create System
    const loggingSystem = new LoggingSystem(
        new MockedStore(),
        MockedObserver,
        10
    );

    //? act
    const msg: string = "This is a message";
    loggingSystem.logInfo(msg);

    //? assert
    const expected = new ProcessLogState(
        3, LogType.INFO, msg, 10
    );

    expect(MockedStore.prototype.insert).toHaveBeenCalledTimes(1);
    expect(MockedStore.prototype.insert).toHaveBeenCalledWith(expected);
    
    expect(MockedObserver.notifyChange).toHaveBeenCalledTimes(1);
    expect(MockedObserver.notifyChange).toHaveBeenCalledWith(expected)    
});
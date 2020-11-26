import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

var base_url = "http://localhost:3000/";

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

async function cadastrarMeta(name) {
    await $("input[name='namebox").sendKeys(<string> name);
    await element(by.buttonText('Adicionar')).click();
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementWithSameName(n, name) {
    var allmetas : ElementArrayFinder = element.all(by.name('metalist'));
    var samename = allmetas.filter(elem => sameName(elem, name));
    await assertTamanhoEqual(samename, n)   
}

defineSupportCode(function ({Given, When, Then}){
    Given(/^Estou na página de metas$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Teaching Assistant')
        await $("m[name='metas']").click();
    });

    When(/^Escrevo a meta "([^\"]*)" $/, async(name) =>{
        await cadastrarMeta(name)
    });

    When(/^Clico no botão Adicionar$/, async() =>{
        await $("a[name='Adicionar").click();
    });

    Then(/^Poderei ver a meta "([^\"]*)" na página de metas$/, async(name) => {
        await assertElementWithSameName(1, name)
    });

    Given(/^Consigo ver a meta "([^\"]*)" na página de metas$/, async(name) => {
        await cadastrarMeta("Entender conceitos de Requisitos");
        await assertElementWithSameName(1, name)
    });

    Then(/^Uma menssagem de erro é exibida$/, async() =>{
        var allmsgs: ElementArrayFinder = element.all(by.name('msgmetaexistente'));
        await assertTamanhoEqual(allmsgs, 1);
    });

    Given(/^O sistema não contém a meta "([^\"]*)"$/, async(name) =>{
        await request.get(base_url + "metas")
            .then(body =>
                expect(body.includes(`"nome":"${name}"`)).to.equal(false))
    });

    When(/^O usuário realizar o cadastro da meta "([^\"]*)"$/, async(name) =>{
        let meta = {"nome": name}
        var options:any = {method: 'POST', uri: (base_url + "metas"), body:meta, json: true};
        await request(options)
            .then(body =>
                expect(JSON.stringify(body)).to.equal(
                    '{"success": "A meta foi cadastrada com sucesso"}'));
    });

    Then(/^O sistema deve armazenar a meta "([^\"]*)"$/, async(name) =>{
        let resposta = `{"nome":"${name}}`
        await request.get(base_url + "/metas")
            .then(body => expect(body.includes(resposta)).to.equal(true));
    });

    Given(/^O sistema contém a meta "([^\"]*)"$/, async(name) =>{
        await request.get(base_url + "metas")
            .then(body =>
                expect(body.includes(`"nome":"${name}"`)).to.equal(true))
    });

    When(/^O usuário realizar o cadastro da meta "([^\"]*)"$/, async(name) =>{
        let meta = {"nome": name}
        var options:any = {method: 'DELETE', uri: (base_url + "metas"), body:meta, json: true};
        await request(options)
            .then(body =>
                expect(JSON.stringify(body)).to.equal(
                    '{"success": "A meta foi removida com sucesso"}'));
    });

    Then(/^O sistema deve armazenar a meta "([^\"]*)"$/, async(name) =>{
        let resposta = `{"nome":"${name}}`
        await request.get(base_url + "/metas")
            .then(body => expect(body.includes(resposta)).to.equal(false));
    });
})
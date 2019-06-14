import os, sys, subprocess, tempfile, time
from BackGround import models
import logging
import time
import pexpect
log = logging.getLogger("collect")


def getdebugger(ctype):
    if ctype == "python":
        return pythondebuggers["python"]

class debugger():
    code = ""
    codetype = "python"
    stdin = ""
    stdout = ""
    action = ""
    breaks = {}
    def __init__(self, ctype, c, s):
        self.code = c
        self.codetype = ctype
        self.stdin = s
    def startdebug(self):
        pass
    def stepinto(self):
        pass
    def stepover(self):
        pass
    def stop(self):
        pass
    #添加断点
    def addbreak(self,l):
        pass
    #取消断点
    def removebreak(self,l):
        pass
    #继续运行
    def continuedebug(self):
        pass
class pythondebugger(debugger):

    process = None
    def __init__(self):
        debugger.__init__(self, "python", "", "")
    #开始调试
    def startdebug(self, c, s,b):
        self.code = c
        self.stdin = s

        result = False
        appresult = ""
        pdbresult = ""
        try:
            TempFile = tempfile.mkdtemp(suffix='_test', prefix='python_') 
            FileNum = "%d.py" % int(time.time() * 1000) 
            fpath = os.path.join(TempFile, FileNum) 
            with open(fpath, 'w', encoding='utf-8') as f: 
                f.write(self.code) 
            #先编译一下再开始调试，否则开始调试时很难分离编译错误
            subprocess.check_output([sys.executable, '-m','py_compile',fpath], stderr=subprocess.STDOUT, timeout=50)
            #启动调试进程
            self.process = pexpect.spawn(sys.executable,["-m","pdb" ,fpath,self.stdin],encoding='utf-8')
            ret = self.process.expect('\(Pdb\)')
            if ret >= 0:
                r = self.process.before.strip()
                r = r.replace('\x07','').replace(self.process.args[3].decode(),'').replace('<module>()','')
                r = r[0:r.find('->')]
                pdbresult = r[r.find('>')+1:].replace('(','').replace(')','').strip()
                
                #设置断点
                self.addbreak(b)
                result = True
        except Exception as e:
            result = False
            appresult = e.stdout.decode()
        return result, appresult, pdbresult    
    #单步跳过
    def stepover(self):
        result = False
        appresult = ""
        pdbresult = ""
        try:
            self.process.sendline('n')
            ret = self.process.expect('\(Pdb\)')
            r = self.process.before.strip()
            log.info(r)

            #分离应用输出和PDB输出
            index = r.find('> ' + self.process.args[3].decode())  #index之前基本上为应用输出，之后为PDB输出
            appresult = r[0:index]
            appresult = appresult.replace('\x07n\r\n', '')
            if appresult == '--Return--\r\n':
                return self.stepover()
            if appresult.find('--Return--\r\n') >= 0:
                appresult = appresult[0:appresult.index('--Return--\r\n')]

            pdbresult = r.replace('> ' + self.process.args[3].decode(),'').replace(appresult,'')
            pdbresult = pdbresult[pdbresult.find('(') + 1:pdbresult.find(')')].strip()

            if (r.find('<module>()->None') >= 0):
                pdbresult = "end"
                self.process.close()
                self.breaks.clear()
            result = True
        except:
            result = False
        return result, appresult, pdbresult
    #单步进入
    def stepinto(self):
        result = False
        appresult = ""
        pdbresult = ""
        try:
            self.process.sendline('s')
            ret = self.process.expect('\(Pdb\)')
            r = self.process.before.strip()

            #分离应用输出和PDB输出
            index = r.find('> ' + self.process.args[3].decode())  #index之前基本上为应用输出，之后为PDB输出
            appresult = r[0:index]
            appresult = appresult.replace('s\r\n', '')
            if appresult == '--Call--\r\n':
                return self.stepinto()
            if appresult == '--Return--\r\n':
                return self.stepinto()
            if appresult.find('--Return--\r\n') >= 0:
                appresult = appresult[0:appresult.index('--Return--\r\n')]
                
            pdbresult = r.replace('> ' + self.process.args[3].decode(),'').replace(appresult,'')
            pdbresult = pdbresult[pdbresult.find('(') + 1:pdbresult.find(')')].strip()
            
            if (r.find('> <string>(1)<module>()->None') >= 0):
                pdbresult = "end"
                appresult = ""
                self.process.close()
                self.breaks.clear()
            result = True
        except Exception as e:
            result = False
        
        return result, appresult, pdbresult
    #停止调试
    def stop(self):
        result = False
        appresult = ""
        pdbresult = ""
        try:
            self.process.terminate()
            result = True
            
        except:
            result = False
        
        return result, appresult, pdbresult
    #继续运行
    def continuedebug(self):
        result = False
        appresult = ""
        pdbresult = ""
        try:
            self.process.sendline('c')
            ret = self.process.expect('\(Pdb\)')
            r = self.process.before.strip()
            #分离应用输出和PDB输出
            index = r.find('> ' + self.process.args[3].decode())  #index之前基本上为应用输出，之后为PDB输出
            appresult = r[0:index]
            appresult = appresult.replace('c\r\n', '')
            if appresult.endswith('The program finished and will be restarted\r\n'):
                appresult = appresult.replace('The program finished and will be restarted\r\n','')
                pdbresult = "end"
                self.process.close()
                self.breaks.clear()
            else:
                pdbresult = r.replace('> ' + self.process.args[3].decode(),'').replace(appresult,'')
                pdbresult = pdbresult[pdbresult.find('(') + 1:pdbresult.find(')')].strip()
           
            result = True
        except Exception as e:
            result = False
        
        return result, appresult, pdbresult
    #添加断点
    def addbreak(self,l):
        result = False
        appresult = ""
        pdbresult = ""
        try:
            for item in l:
                if(item not in self.breaks):
                    self.process.sendline('b %d'%item)
                    ret = self.process.expect('\(Pdb\)')
                    r = self.process.before
                    r = r[r.find('Breakpoint') + 10:r.find('at')].strip()
                    self.breaks[item] = r
                log.info(self.process.before)
            result = True
        except Exception as e:
            result = False
        
        return result, appresult, pdbresult

    #取消断点
    def removebreak(self,l):
        result = False
        appresult = ""
        pdbresult = ""
        try:
            for item in l:
                if(item  in self.breaks):
                    self.process.sendline('cl %d'%item)
                    ret = self.process.expect('\(Pdb\)')
                    self.breaks.pop(item)
                log.info(self.process.before)
            result = True
        except Exception as e:
            result = False
        
        return result, appresult, pdbresult



pythondebuggers = {"python":pythondebugger()}

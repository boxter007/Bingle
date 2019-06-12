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
    action =""
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


class pythondebugger(debugger):

    process = None
    outlog = ""
    def __init__(self):
        debugger.__init__(self, "python", "", "")
    def startdebug(self, c, s):
        self.code = c
        self.stdin = s

        try:
            TempFile = tempfile.mkdtemp(suffix='_test', prefix='python_') 
            FileNum = "%d.py" % int(time.time() * 1000) 
            fpath = os.path.join(TempFile, FileNum) 
            with open(fpath, 'w', encoding='utf-8') as f: 
                f.write(self.code) 
            #self.process = subprocess.Popen([sys.executable,"-m","pdb" ,fpath,self.stdin],stdin = subprocess.PIPE,stdout=subprocess.PIPE, stderr=subprocess.STDOUT,bufsize=1)
            self.process = pexpect.spawn(sys.executable,["-m","pdb" ,fpath,self.stdin],encoding='utf-8')
            ret = self.process.expect('\(Pdb\)')
            if ret < 0:
                return False
            else:
                return True
        except Exception as e:
            return False

    def stepover(self):
        try:
            self.process.sendline('n')
            ret = self.process.expect('\(Pdb\)')
            result = self.process.before.strip()
            result = result.replace('\x07','').replace(self.process.args[3].decode(),'').replace('<module>()','')
            result = result[0:result.find('->')]
            result = result[result.find('\r\n') + 2:].strip()
            appresult = result[0:result.find('>')]
            pdbresult = result[result.find('>')+1:].replace('(','').replace(')','').strip()
            if (appresult.find('--Return--')>0):
                pdbresult = 'return'
                appresult = appresult.replace('--Return--', '')
                self.process.close()
            return True, appresult, pdbresult
        except:
            return False, '', ''

    def stop(self):
        try:
            self.process.terminate()
            return "true"
        except:
            return "false"

pythondebuggers = {"python":pythondebugger()}
